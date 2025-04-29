import ldap from "ldapjs";

const client = ldap.createClient({
  url: "ldap://dev.autointelli.com:4389", // Your LDAP server URL
});

export default client;
