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
              Please read the terms and conditions carefully
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <h2 className="text-lg font-bold">1. Data Retention Policy</h2>
                <ol className="list-decimal list-inside pl-4">
                  <li className="text-sm">
                    If a user chooses to log in to our website, their login data
                    will be retained for a period of seven (7) days to
                    facilitate a seamless user experience.
                  </li>
                  <li className="text-sm">
                    Users have the option to remain signed in during this
                    period. If users wish to log out before the seven-day period
                    ends, they can do so at any time through their account
                    settings.
                  </li>
                  <li className="text-sm">
                    After the seven-day period, users will need to log in again
                    to continue accessing their account.
                  </li>
                  <li className="text-sm">
                    We do not collect or store any user passwords. We only store
                    cookies from LEB2 that are necessary for the website to
                    function properly.
                  </li>
                </ol>
              </div>
              <div className="flex flex-col space-y-1.5">
                <h2 className="text-lg font-bold">2. Changes to the Terms</h2>
                <p className="text-sm pl-4">
                  We reserve the right to modify these Terms & Conditions at any
                  time. Any changes will be posted on this page, and users are
                  encouraged to review the T&C periodically to stay informed
                  about updates.
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <h2 className="text-lg font-bold">3. Contact Us</h2>
                <p className="text-sm pl-4">
                  If you have any questions or concerns regarding these Terms &
                  Conditions, please contact us at{" "}
                  <a href="mailto:bukharney@gmail.com">bukharney@gmail.com</a>.
                </p>
              </div>
              <div className="flex flex-col space-y-1.5">
                <h2 className="text-lg font-bold">4. Effective Date</h2>
                <p className="text-sm pl-4">
                  These Terms & Conditions are effective as of September 1,
                  2024.
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
