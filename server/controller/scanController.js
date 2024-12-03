const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} = require("@simplewebauthn/server");
const {
  getVoterByEmail,
  createVoter,
  updateVoterCounter,
} = require("../services/scanService");


const CLIENT_URL = "https://e-elect.vercel.app";
const RP_ID = "e-elect.vercel.app";

// const CLIENT_URL = "http://localhost:3000";
// const RP_ID = "localhost";

const initRegister = async (req, res) => {
  const nrcNumber = req.query.nrcNumber;
  if (!nrcNumber) {
    return res.status(400).json({ error: "nrcNumber is required" });
  }

  try {
    const existingVoter = await getVoterByEmail(nrcNumber);
    // if (existingVoter != null) {
    //   return res.status(400).json({ error: "Voter already exists" });
    // }

    const options = await generateRegistrationOptions({
      rpID: RP_ID,
      rpName: "E-Voting Zambia",
      nrcNumber: nrcNumber,
    });

    // Send the registration options and required data in the response body
    const regData = {
      userId: options.user.id,
      nrcNumber,
      challenge: options.challenge,
    };

    res.json({ options, regData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};


const verifyRegister = async (req, res) => {
  const { regData, userId, nrcNumber } = req.body;

  if (!regData || !userId || !nrcNumber) {
    return res.status(400).json({ error: "Missing registration data" });
  }

  try {
    const verification = await verifyRegistrationResponse({
      response: req.body,
      expectedChallenge: regData.challenge,
      expectedOrigin: CLIENT_URL,
      expectedRPID: RP_ID,
    });

    if (verification.verified) {
      const registrationInfo = verification.registrationInfo;

      const fieldsToLog = {
        id: registrationInfo?.credential.id,
        publicKey: registrationInfo?.credential.publicKey,
        counter: registrationInfo?.credential.counter,
        deviceType: registrationInfo?.credentialDeviceType,
        backedUp: registrationInfo?.credentialBackedUp,
        transport: registrationInfo.credential.transports,
        credentialID: registrationInfo?.credential.id,
        userId: userId,
        nrcNumber: nrcNumber,
      };

      Object.entries(fieldsToLog).forEach(([key, value]) => {
        if (value === undefined) {
          console.warn(`Warning: Field "${key}" is undefined`);
        } else {
          console.log(`Field "${key}":`, value);
        }
      });

      await createVoter(nrcNumber, userId, fieldsToLog);
      return res.json({ verified: verification.verified });
    } else {
      return res.status(400).json({ verified: false, error: "Verification failed" });
    }
  } catch (error) {
    console.error("Error during /verify-register:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};


const initAuth = async (req, res) => {
  const nrcNumber = req.query.nrcNumber;
  if (!nrcNumber) {
    return res.status(400).json({ error: "Nrc is required" });
  }

  try {
    const voter = await getVoterByEmail(nrcNumber);
    if (voter == null) {
      return res.status(400).json({ error: "No voter for this Nrc Number" });
    }

    const passKey = voter;
    const options = await generateAuthenticationOptions({
      rpID: RP_ID,
      allowCredentials: [
        {
          id: passKey.credentialID,
          type: "public-key",
          transports: passKey.transports,
        },
      ],
    });

    const authInfo = JSON.stringify({
      userId: voter.userId,
      challenge: options.challenge,
    });

    // Set the cookie correctly
    res.cookie("authInfo", authInfo, {
      httpOnly: true,
      maxAge: 100000,
      secure: true, // Set to true in production
      sameSite: "None", // Or adjust as necessary for your case
    });
    const payload = {
      options,
      authInfo,
      voter,
    };
    console.log("Cookie 'authInfo' set with value:", authInfo);
    res.json(payload);
  } catch (error) {
    console.error("Error during /init-auth:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const verifyAuth = async (req, res) => {
  console.log("this is data", req.body);

  const authInfo = req.body;
  console.log("this is credential id my son", authInfo.credentialId);

  const parsedAuthInfo = JSON.parse(authInfo.authInfo);

  console.log("this is credential id my son", authInfo.credentialId);

  console.log("this is user id", parsedAuthInfo.userId);

  try {
    // const voter = await getVoterById(parsedAuthInfo.userId);

    const voter = await getVoterByEmail(authInfo.voter.nrcNumber);

    if (!voter) {
      return res.status(400).json({ error: "Voter not found" });
    }

    if (!authInfo) {
      throw new Error("Missing authInfo or invalid authentication information");
    }

    if (!authInfo.voter) {
      throw new Error(
        "Missing authInfo voter or invalid authentication information"
      );
    }

    // Ensure voter.counter is defined and has a valid value
    if (voter.counter == null) {
      console.log(voter.counter);

      return res
        .status(400)
        .json({ message: voter.counter, error: "Invalid voter data" });
    }

    votercounter = voter.counter != null ? voter.counter : 1;

    console.log("Verification Data:", {
      credentialID: voter.credentialID,
      credentialPublicKey: voter.publicKey,
      counter: voter.counter,
      transports: voter.transports || [`internal`],
    });

    const verification = await verifyAuthenticationResponse({
      response: authInfo.auth,
      expectedChallenge: parsedAuthInfo.challenge,
      expectedOrigin: CLIENT_URL,
      expectedRPID: RP_ID,
      authenticator: {
        credentialID: voter.credentialID,
        credentialPublicKey: voter.publicKey,
        counter: voter.counter,
        transports: voter.transports,
      },
    });

    if (verification.verified) {
      console.log("this is great");

      await updateVoterCounter(voter.nrcNumber, voter.counter + 1);
      res.clearCookie("authInfo");
      return res.json({ verified: verification.verified });
    } else {
      return res
        .status(400)
        .json({ verified: false, error: "Verification failed" });
    }
  } catch (error) {
    console.log({
      message: "Error during /verify-auth:",
      error: error,
      errors: error.message,
    });
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  initRegister,
  verifyRegister,
  initAuth,
  verifyAuth,
};
