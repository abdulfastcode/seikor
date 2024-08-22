import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  backButtonHref: string;
  backButtonLabel: string;
}

export const BackButton = ({
  backButtonHref,
  backButtonLabel,
}: BackButtonProps) => {
  return (
    <>
      <Button asChild variant="link" size="sm" className="font-normal w-full">
        <Link href={backButtonHref}>{backButtonLabel}</Link>
      </Button>
    </>
  );
};
