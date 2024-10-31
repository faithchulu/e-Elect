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
  getVoterById,
  getVoterPassKeyById,
} = require("../services/scanService");

const CLIENT_URL = "http://localhost:3000";
const RP_ID = "localhost";

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

    res.cookie(
      "regInfo",
      JSON.stringify({
        userId: options.user.id,
        nrcNumber,
        challenge: options.challenge,
      }),
      { httpOnly: true, maxAge: 60000, secure: true }
    );

    res.json(options);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const verifyRegister = async (req, res) => {
  const regInfo = JSON.parse(req.cookies.regInfo);
  console.log(req.body);

  if (!regInfo) {
    return res.status(400).json({ error: "Registration info not found" });
  }

  console.log("this is request body", req.body);

  console.log("this is user data", req.body.userId);

  try {
    const verification = await verifyRegistrationResponse({
      response: req.body,
      expectedChallenge: regInfo.challenge,
      expectedOrigin: CLIENT_URL,
      expectedRPID: RP_ID,
    });

    if (verification.verified) {
      // Log each field to check for undefined values
      const registrationInfo = verification.registrationInfo;

      console.log("this is verification data", registrationInfo);

      console.log("this is credential type", registrationInfo.credentialType);
      console.log("this is credentialId", registrationInfo.credential.id);
      console.log("this is counter", registrationInfo.credential.counter);

      console.log("this is user id", req.body.userId);

      const fieldsToLog = {
        id: registrationInfo?.credential.id,
        publicKey: registrationInfo?.credential.publicKey,
        counter: registrationInfo?.credential.counter,
        deviceType: registrationInfo?.credentialDeviceType,
        backedUp: registrationInfo?.credentialBackedUp,
        transport: registrationInfo.credential.transports,
        credentialID: registrationInfo?.credential.id,
        userId: req.body.userId,
        nrcNumber: req.body.nrcNumber,
      };

      Object.entries(fieldsToLog).forEach(([key, value]) => {
        if (value === undefined) {
          console.warn(`Warning: Field "${key}" is undefined`);
        } else {
          console.log(`Field "${key}":`, value);
        }
      });

      await createVoter(regInfo.nrcNumber, regInfo.userId, fieldsToLog);

      res.clearCookie("regInfo");
      return res.json({ verified: verification.verified });
    } else {
      return res
        .status(400)
        .json({ verified: false, error: "Verification failed" });
    }
  } catch (error) {
    console.error("Error during /verify-register:", error);
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};

const initAuth = async (req, res) => {
  const email = req.query.nrcNumber;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const voter = await getVoterByEmail(email);
    if (voter == null) {
      return res.status(400).json({ error: "No voter for this email" });
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
      secure: false, // Set to true in production
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

  // let authInfo;
  // try {
  //   authInfo = JSON.parse(req.cookies.authInfo);
  // } catch (error) {
  //   console.error("Error parsing authInfo cookie:", error);
  //   return res.status(400).json({ error: "Invalid authInfo format" });
  // }

  console.log("this is user id", parsedAuthInfo.userId);

  try {
    const voter = await getVoterById(parsedAuthInfo.userId);

    // const passkeys = await getVoterPassKeyById(parsedAuthInfo.userId)

    // console.log("passkeys and credentialId",passKeys)

    if (!voter) {
      return res.status(400).json({ error: "Voter not found" });
    }

    console.log("this is cred id son", authInfo.credentialId);

    console.log("response:", parsedAuthInfo);
    console.log("Challenge:", parsedAuthInfo.challenge);
    console.log("Expected Origin:", CLIENT_URL);
    console.log("Expected RPID:", RP_ID);
    console.log("Credential ID:", authInfo.credentialId);
    console.log("Authenticator Object:", {
      credentialID: authInfo.credentialId,
      credentialPublicKey: authInfo.publicKey,
      counter: authInfo.voter.counter,
      transports: authInfo.transport,
    });

    console.log("this is counter stuff", authInfo.voter.counter);
    console.log("Full authInfo:", authInfo);

    if (!authInfo) {
      throw new Error("Missing authInfo or invalid authentication information");
    }

    if (!authInfo.voter) {
      throw new Error(
        "Missing authInfo voter or invalid authentication information"
      );
    }

    // if (!authInfo.counter) {
    //   console.log(authInfo.counter)
    //   throw new Error("Missing authInfo voter counter or invalid authentication information");
    // }
    // const passKey = voter.passKey[0];

    console.log("Full verification with counter:", {
      expectedChallenge: parsedAuthInfo.challenge,
      expectedOrigin: CLIENT_URL,
      expectedRPID: RP_ID,
      authenticator: {
        credentialID: authInfo.credentialId,
        credentialPublicKey: Buffer.from(authInfo.publicKey, "base64"),
        counter: authInfo.counter,
        transports: authInfo.transport,
      },
    });

    console.log("Full verification params:", {
      expectedChallenge: parsedAuthInfo.challenge,
      expectedOrigin: CLIENT_URL,
      expectedRPID: RP_ID,
      authenticator: {
        credentialID: authInfo.credentialId,
        credentialPublicKey: authInfo.publicKey,
        counter: 0,
        transports: authInfo.transport,
      },
    });

    console.log("Auth Response Structure:", authInfo.auth);

    const verification = await verifyAuthenticationResponse({
      response: authInfo.auth,
      expectedChallenge: parsedAuthInfo.challenge,
      expectedOrigin: CLIENT_URL,
      expectedRPID: RP_ID,
      counter: "0",
      authenticator: {
        credentialID: authInfo.credentialId,
        credentialPublicKey: authInfo.publicKey,
        counter: "0",
        transports: "",
      },
    });

    if (verification.verified) {
      console.log("this is great");

      await updateVoterCounter(parsedAuthInfo.userId, authInfo.counter);
      res.clearCookie("authInfo");
      return res.json({ verified: verification.verified });
    } else {
      return res
        .status(400)
        .json({ verified: false, error: "Verification failed" });
    }
  } catch (error) {
    console.error({
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
