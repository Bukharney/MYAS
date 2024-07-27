import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function TermsAndConditions() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-4">
      <main className="flex  justify-center items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
            <CardDescription>
              Please read the terms and conditions carefullyß
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <h2 className="text-lg font-bold">1. Data Retention Policy</h2>
                <p className="text-sm">
                  1.1 If a user chooses to log in to our website, their login
                  data will be retained for a period of seven (7) days to
                  facilitate a seamless user experience.
                </p>
                <p className="text-sm">
                  1.2 Users have the option to remain signed in during this
                  period. If users wish to log out before the seven-day period
                  ends, they can do so at any time through their account
                  settings.
                </p>
                <p className="text-sm">
                  1.3 After the seven-day period, users will need to log in
                  again to continue accessing their account.
                </p>
                <p className="text-sm">
                  1.4 We do not collect or store any user passwords. All
                  password management is handled securely through third-party
                  authentication providers.
                </p>
                <p className="text-sm">
                  1.5 We are committed to protecting the privacy and security of
                  our users' data. For more information on how we handle user
                  data, please refer to our Privacy Policy.
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <h2 className="text-lg font-bold">2. Changes to the Terms</h2>
                <p className="text-sm">
                  We reserve the right to modify these Terms & Conditions at any
                  time. Any changes will be posted on this page, and users are
                  encouraged to review the T&C periodically to stay informed
                  about updates.
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <h2 className="text-lg font-bold">3. Contact Us</h2>
                <p className="text-sm">
                  If you have any questions or concerns regarding these Terms &
                  Conditions, please contact us at [your contact information].
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <h2 className="text-lg font-bold">4. Effective Date</h2>
                <p className="text-sm">
                  These Terms & Conditions are effective as of [date]. Last
                  updated: [date].
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default TermsAndConditions;
