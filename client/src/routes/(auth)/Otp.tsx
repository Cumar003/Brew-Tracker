import { GalleryVerticalEnd } from "lucide-react";
import { OtpVerificationForm } from "./OtpVerificationForm";

const Otp = () => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {/* Enhanced gradient blur effect at the top */}
      <div className="absolute top-0 left-0 right-0 h-80 overflow-hidden -z-10">
        {/* Larger, more vibrant gradient circles */}
        <div className="absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-purple-400 opacity-80 blur-2xl"></div>
        <div className="absolute -top-10 right-10 h-[280px] w-[280px] rounded-full bg-pink-400 opacity-80 blur-2xl"></div>
        <div className="absolute top-20 left-1/4 h-[250px] w-[250px] rounded-full bg-teal-400 opacity-70 blur-2xl"></div>
        <div className="absolute top-10 right-1/3 h-[220px] w-[220px] rounded-full bg-amber-400 opacity-70 blur-2xl"></div>

        {/* Backdrop blur overlay */}
        <div className="absolute inset-0 backdrop-blur-[8px]"></div>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-6 z-10">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <OtpVerificationForm />
      </div>
    </div>
  );
};

export default Otp;
