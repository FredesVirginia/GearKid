import { RecoverPassword } from "../../components/partials/auth/RecoverPassword";
import { SentRequestPass } from "../../components/partials/auth/SentRequestPass";
import { AuthContainer } from "../../components/containers/AuthContainer";
import { useRecoverPassStore } from "../../store/useRecoverPassStore";
import { useEffect } from "react";
import { BackgroundLayout } from "../../components/layouts/BackgroundLayout";

export const RecoverPassPage = () => {
  const { isRequestSent, setIsRequestSent } = useRecoverPassStore();

  useEffect(() => {
    setIsRequestSent(false);
  }, []);

  return (
    <BackgroundLayout theme={"recover-password"}>
      <AuthContainer>{isRequestSent ? <SentRequestPass /> : <RecoverPassword />}</AuthContainer>
    </BackgroundLayout>
  );
};
