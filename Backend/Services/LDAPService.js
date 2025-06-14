// ldapService.js
import ldap from "ldapjs";

const LDAP_URL = "ldap://dev.autointelli.com:4389"; // or ldaps:// for secure
const BASE_DN = "dc=opsduty,dc=dev"; // Base domain
const ADMIN_DN = "cn=aiadmin,cn=Users,dc=opsduty,dc=dev"; // Admin account to search
const ADMIN_PASSWORD = "@ut0!ntell!@123";

export function authenticate(username, password) {
  return new Promise((resolve, reject) => {
    const client = ldap.createClient({ url: LDAP_URL });

    // Step 1: Bind as admin 
    client.bind(ADMIN_DN, ADMIN_PASSWORD, (err) => {
      if (err) {
        return reject("Admin bind failed: " + err.message);
      }

      // Step 2: Search for the user DN using sAMAccountName
      const searchOptions = {
        filter: `(sAMAccountName=${username})`,
        scope: "sub",
        attributes: ["dn", "cn", "mail"],
      };

      client.search(BASE_DN, searchOptions, (err, res) => {
        if (err) return reject("Search failed: " + err.message);

        let userDN = null;

     res.on("searchEntry", (entry) => {
       const user = entry.pojo || entry.object;

       console.log("Parsed user entry:", user);

       if (user && user.dn) {
         userDN = user.dn.toString(); // ✅ Convert to string if needed
       } else if (entry.dn) {
         userDN = entry.dn.toString(); // ✅ Ensure it's a plain string
       } else {
         return reject(
           "Entry found, but DN is missing or unrecognized structure"
         );
       }
     });


        res.on("end", () => {
          console.log("User DN (typeof):", typeof userDN, userDN);
          if (!userDN) {
            return reject("User not found");
          }

          // Step 3: Bind as the user
          client.bind(userDN, password, (err) => {
            console.log("password:", password);
            client.unbind(); // Always unbind after operations
            if (err) {
              return reject("Invalid credentials");
            } else {
              return resolve(`Authenticated: ${userDN}`);
            }
          });
        });

        res.on("error", (err) => {
          return reject("Search error: " + err.message);
        });
      });
    });
  });
}
