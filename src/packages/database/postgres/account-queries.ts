/*
 *  This file is part of CoCalc: Copyright © 2020 Sagemath, Inc.
 *  License: AGPLv3 s.t. "Commons Clause" – see LICENSE.md for details
 */

// Various functions involving the database and accounts.

import { PostgreSQL } from "./types";

import { callback2 } from "@cocalc/util/async-utils";
import { len } from "@cocalc/util/misc";
import { is_a_site_license_manager } from "./site-license/search";

/* For now we define "paying customer" to mean they have a subscription.
  It's OK if it expired.  They at least bought one once.
  This is mainly used for anti-abuse purposes...
*/
export async function is_paying_customer(
  db: PostgreSQL,
  account_id: string
): Promise<boolean> {
  let x;
  try {
    x = await callback2(db.get_account, {
      account_id,
      columns: ["stripe_customer"],
    });
  } catch (_err) {
    // error probably means there is no such account or account_id is badly formatted.
    return false;
  }
  if (!!x.stripe_customer?.subscriptions?.total_count) {
    // they have at least one subscription of some form -- so that's enough to count.
    return true;
  }
  // If they manage any licenses then they also count:
  return await is_a_site_license_manager(db, account_id);
}

export async function set_account_info_if_possible(opts: {
  db: PostgreSQL;
  account_id: string;
  email_address: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
}): Promise<void> {
  const columns = ["email_address", "first_name", "last_name"];
  const account = await get_account(opts.db, opts.account_id, columns);
  const do_set: {
    [field: string]: string;
  } = {};
  for (const field of columns) {
    if (!!opts[field] && !account[field]) {
      do_set[field] = opts[field];
    }
  }
  if (len(do_set) == 0) {
    // nothing to change
    return;
  }
  await set_account(opts.db, opts.account_id, do_set);
  if (do_set["email_address"]) {
    // Just changed email address - might be added to a project...
    await callback2(opts.db.do_account_creation_actions.bind(opts.db), {
      email_address: opts.email_address,
      account_id: opts.account_id,
    });
  }
}

export async function set_account(
  db: PostgreSQL,
  account_id: string,
  set: { [field: string]: any }
): Promise<void> {
  await callback2(db._query.bind(db), {
    query: "UPDATE accounts",
    where: { "account_id = $::UUID": account_id },
    set,
  });
}

export async function get_account(
  db: PostgreSQL,
  account_id: string,
  columns: string[]
): Promise<void> {
  return await callback2(db.get_account.bind(db), {
    account_id,
    columns,
  });
}
