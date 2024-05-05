import { InputOTPForm } from "./InputOTPForm";

const Verify = ({ email, token }: { email: string, token: string }) => {

  return (
    <div className="border rounded-xl p-6 shadow-lg w-96 mx-3 flex flex-col space-y-4">
      <h1 className="flex flex-col gap-2">
        <span className="font-bold text-lg leading-none">Verify your email</span>
        <span className="text-sm">to continue to Central Sync Hub</span>
      </h1>
      <div className="border"></div>

      <InputOTPForm
        email={email}
        token={token}
      />
    </div>
  );
};

export default Verify;