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
  } = require("../services/scanService");
  
  const CLIENT_URL = "http://localhost:3001";
  const RP_ID = "localhost";
  
  const initRegister = async (req, res) => {
    const nrcNumber = req.query.nrcNumber;
    if (!nrcNumber) {
      return res.status(400).json({ error: "nrcNumber is required" });
    }
  
    try {
      const existingVoter = await getVoterByEmail(nrcNumber);
      if (existingVoter != null) {
        return res.status(400).json({ error: "Voter already exists" });
      }
  
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
  
    if (!regInfo) {
      return res.status(400).json({ error: "Registration info not found" });
    }
  
    try {
      const verification = await verifyRegistrationResponse({
        response: req.body,
        expectedChallenge: regInfo.challenge,
        expectedOrigin: CLIENT_URL,
        expectedRPID: RP_ID,
      });
  
      if (verification.verified) {
        await createVoter(regInfo.email, regInfo.userId, {
          id: verification.registrationInfo.credentialID,
          publicKey: verification.registrationInfo.credentialPublicKey,
          counter: verification.registrationInfo.counter,
          deviceType: verification.registrationInfo.credentialDeviceType,
          backedUp: verification.registrationInfo.credentialBackedUp,
          transport: req.body.transports,
          credentialID: verification.registrationInfo.credentialID,
        });
        res.clearCookie("regInfo");
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
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
  
    try {
      const voter = await getVoterByEmail(email);
      if (voter == null) {
        return res.status(400).json({ error: "No voter for this email" });
      }
  
      const passKey = voter.passKey[0];
  
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
  
      res.cookie(
        "authInfo",
        JSON.stringify({
          userId: voter.id,
          challenge: options.challenge,
        }),
        { httpOnly: true, maxAge: 60000, secure: true }
      );
  
      res.json(options);
    } catch (error) {
      console.error("Error during /init-auth:", error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  
  const verifyAuth = async (req, res) => {
    const authInfo = JSON.parse(req.cookies.authInfo);
  
    if (!authInfo) {
      return res.status(400).json({ error: "Authentication info not found" });
    }
  
    try {
      const voter = await getVoterById(authInfo.userId);
      const passKey = voter.passKey[0];
  
      const verification = await verifyAuthenticationResponse({
        response: req.body,
        expectedChallenge: authInfo.challenge,
        expectedOrigin: CLIENT_URL,
        expectedRPID: RP_ID,
        authenticator: {
          credentialID: passKey.credentialID,
          credentialPublicKey: Buffer.from(passKey.publicKey, 'base64'),
          counter: passKey.counter,
          transports: passKey.transports,
        },
      });
  
      if (verification.verified) {
        await updateVoterCounter(voter.id, verification.authenticationInfo.newCounter);
        res.clearCookie("authInfo");
        return res.json({ verified: verification.verified });
      } else {
        return res.status(400).json({ verified: false, error: "Verification failed" });
      }
    } catch (error) {
      console.error("Error during /verify-auth:", error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  
  module.exports = {
    initRegister,
    verifyRegister,
    initAuth,
    verifyAuth,
  };
  