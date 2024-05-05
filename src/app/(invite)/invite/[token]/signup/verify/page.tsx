'use client';

import Spinner from "@/components/spinner";
import { emailVerificationStore } from "@/store/emailVerification";
import Verify from "./_components/verify";

const VerifyEmailAddressSignUp = ({ params }: { params: { token: string } }) => {
  const email = emailVerificationStore((state) => state.email);

  if (!email) {
    return (
      <div className="h-full w-full justify-center items-center flex">
        <Spinner size={'icon'} />
      </div>
    );
  }

  return (
    <Verify email={email} token={params.token} />
  );
};

export default VerifyEmailAddressSignUp;