import client from "../Config/LDAPConfig.js";

// Bind admin (connect to LDAP server)
export const bindAdmin = () => {
  return new Promise((resolve, reject) => {
    client.bind(
      "CN=aiadmin,CN=Users,DC=opsduty,DC=dev", // 👈 Corrected DN
      "@ut0!ntell!@123", // 👈 replace with the correct password
      (err) => {
        if (err) {
          reject("LDAP bind failed: " + err);
        } else {
          resolve("LDAP bind successful");
        }
      }
    );
  });
};

// Search a user
export const searchUser = (username) => {
  return new Promise((resolve, reject) => {
    const options = {
      scope: "sub",
      filter: `(uid=${username})`, // or maybe (sAMAccountName=username) for Active Directory
    };

    client.search("dc=opsduty,dc=dev", options, (err, res) => {
      if (err) return reject(err);

      const entries = [];

      res.on("searchEntry", (entry) => {
        entries.push(entry.object);
      });

      res.on("error", (err) => {
        reject(err);
      });

      res.on("end", () => {
        resolve(entries);
      });
    });
  });
};
