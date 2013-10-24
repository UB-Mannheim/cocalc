"""
Templates for generating XML configuration files to import into Zabbix.
"""

from lxml import etree

parser = etree.XMLParser(remove_blank_text=False)

ZABBIX_ROOT = \
"""
<zabbix_export>
    <version>2.0</version>
    <groups>
    </groups>
    <hosts>
    </hosts>
</zabbix_export>
"""
def root():
	return  etree.XML(ZABBIX_ROOT, parser)


ZABBIX_HOST = \
"""
<host>
    <host></host>
    <name></name>
    <proxy/>
    <status>0</status>
    <ipmi_authtype>-1</ipmi_authtype>
    <ipmi_privilege>2</ipmi_privilege>
    <ipmi_username/>
    <ipmi_password/>
    <templates>
    </templates>
    <groups>
    </groups>
    <interfaces>
        <interface>
            <default>1</default>
            <type>1</type>
            <useip>1</useip>
            <ip></ip>
            <dns></dns>
            <port>10050</port>
            <interface_ref>if1</interface_ref>
        </interface>
    </interfaces>
    <applications/>
    <items/>
    <discovery_rules/>
    <macros/>
    <inventory/>
</host>
"""

def host(hostname="", name="", ip="", port="10050", templates = [""], groups = [""]):
	_host = etree.XML(ZABBIX_HOST, parser)
	_host.find("host").text = hostname
	_host.find("name").text = hostname

	for _template in templates:
		_host.find("templates").append(template(name=_template))

	for _group in groups:
		_host.find("groups").append(group(name=_group))

	_host.find("interfaces").find("interface").find("ip").text = ip
	_host.find("interfaces").find("interface").find("port").text = port
	return _host


ZABBIX_TEMPLATE = "<template><name/></template>"

def template(name = ""):
	_template = etree.XML(ZABBIX_TEMPLATE)
	_template.find("name").text = name
 	return	_template


ZABBIX_GROUP = "<group><name/></group>"

def group(name = ""):
	_group = etree.XML(ZABBIX_GROUP)
	_group.find("name").text = name
	return _group