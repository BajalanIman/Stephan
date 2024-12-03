import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import adaptLogo from "./../../assets/Images/adaptLogo.png";

const DataProtection = () => {
  return (
    <div className="w-full h-[100%] flex  justify-center items-center px-2 relative">
      <Box
        sx={{
          mt: { xs: 4, md: 4 },
          mb: 4,
          width: "full",
          maxWidth: "1200px",
          color: "black",
        }}
      >
        <Link to="/">
          <img
            src={adaptLogo}
            className="w-20 opacity-90 cursor-pointer fixed top-0 left-1/2 transform -translate-x-1/2"
          />
        </Link>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Data Protection
        </Typography>
        <Typography variant="body1" paragraph>
          We are happy to welcome you to our website.
        </Typography>
        <Typography variant="body1" paragraph>
          In order to protect your data from unauthorized access as
          comprehensively as possible, we take technical and organizational
          measures. This is the safest way to offer content on the web!
        </Typography>
        <Typography variant="body1" paragraph>
          To protect your data during the use of our online services, we use
          encryption methods. Your information is transmitted from your computer
          to our server and vice versa over the internet using TLS encryption.
          You can recognize this because the lock symbol in your browser's
          status bar is closed and the address bar starts with https://.
        </Typography>
        <Typography variant="body1" paragraph>
          Below, we would like to inform you about how your data is handled in
          accordance with Article 13 of the General Data Protection Regulation
          (GDPR) on the ADAPT-Wald-Holz website. If you have any further
          questions, please contact us:{" "}
        </Typography>
        <Typography variant="body1" paragraph>
          Responsible for the website: Stephan Playfair{" "}
          <Link href="mailto:Stephan.Playfair@zalf.de">
            (Stephan.Playfair@zalf.de)
          </Link>
        </Typography>

        <Box mt={2} mb={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Data Minimization
          </Typography>
          <Typography variant="body1" paragraph>
            The most important principle is data minimization. We have designed
            our internet services in such a way that their use can be anonymous.
          </Typography>
          <Typography variant="body1" paragraph>
            We do not use cookies.
          </Typography>
        </Box>

        <Box mt={3} mb={2}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }} paragraph>
            <strong>Which data of users are stored?</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            Contact via Email or Phone
          </Typography>
          <Typography variant="body1" paragraph>
            If you contact us via email or phone, your information will be
            stored by us to allow us to process and respond to your inquiry.
            Without your consent, this data will not be passed on to third
            parties. Your data will only be processed to respond to your inquiry
            and will be deleted after a period of 24 months at the latest.
          </Typography>
        </Box>

        <Box mt={2} mb={2}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Additional Contents of the Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Data Transfer to Third Parties</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            We do not transmit your data to third parties.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Data Transfer to Third Countries</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            Data transfer to third countries does not occur.
          </Typography>
        </Box>

        <Box mt={2} mb={2}>
          <Typography variant="body1" paragraph>
            <strong>Rights of the User</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            The GDPR grants you certain rights regarding the processing of your
            personal data, which we will explain to you here.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Right to Information (Art. 15 GDPR)</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to request confirmation as to whether data
            concerning you is being processed; if this is the case, you have the
            right to access this personal data and the information listed in
            Article 15 of the GDPR.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>
              Right to Rectification and Deletion (Art. 16 and 17 GDPR)
            </strong>
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to request the immediate rectification of
            inaccurate personal data and, where applicable, the completion of
            incomplete personal data. You also have the right to request the
            immediate deletion of personal data concerning you, provided that
            one of the reasons listed in Article 17 of the GDPR applies, for
            example, if the data is no longer necessary for the purposes
            pursued.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Right to Restriction of Processing (Art. 18 GDPR)</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to request the restriction of processing for the
            duration of any examination if one of the conditions listed in
            Article 18 of the GDPR applies, for example, if you have lodged an
            objection to the processing.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Right to Data Portability (Art. 20 GDPR)</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            In certain cases listed in Article 20 of the GDPR, you have the
            right to receive your personal data in a structured, commonly used,
            and machine-readable format, or to request the transmission of this
            data to a third party.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Right to Object (Art. 21 GDPR)</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            If data is collected based on Art. 6 (1) lit. f (data processing for
            the protection of legitimate interests), you have the right to
            object to the processing at any time for reasons related to your
            particular situation. We will no longer process the personal data,
            unless there are compelling legitimate grounds for the processing
            that override your interests, rights, and freedoms, or the
            processing is necessary for the establishment, exercise, or defense
            of legal claims.
          </Typography>
        </Box>

        <Box mt={2} mb={2}>
          <Typography variant="body1" paragraph>
            <strong>
              Right to File a Complaint with a Supervisory Authority
            </strong>
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right, under Article 77 of the GDPR, to file a
            complaint with a supervisory authority if you believe that the
            processing of your data violates data protection laws. The complaint
            can be filed with a supervisory authority in the member state of
            your residence, place of work, or the location of the alleged
            violation.
          </Typography>
        </Box>

        <Box mt={2} mb={2}>
          <Typography variant="body1" paragraph>
            <strong>Contact Data Protection</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any further questions about data protection with us, we
            would be happy to answer them. You can contact our contact person
            via email.
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for your interest in this important topic!
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default DataProtection;
