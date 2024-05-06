import { useFormik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import GEAR_ORIGINAL from "../../assets/logos/GEAR_ORIGINAL.svg";
import { Button } from "../../components/butons/Button";
import { FormContainer } from "../../components/containers/FormContainer";
import { Input } from "../../components/inputs/Input";
import { AuthMaskLayout } from "../../components/layouts/AuthMaskLayout";
import { BackgroundLayout } from "../../components/layouts/BackgroundLayout";
import { useLogin } from "../../hooks/auth/hooksAuth";
import useForm from "../../hooks/useForm";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string().email("invalidEmail").required("required"),
  password: Yup.string().required("required"),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const { form } = useForm(INITIAL_VALUES);
  const { queryLogin } = useLogin();

  const formik = useFormik({
    initialValues: form,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values: typeof INITIAL_VALUES) {
    queryLogin.mutate(values, {
      onSuccess(data) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        navigate("/levels");
      },
      onError(error) {
        toast.error(error.detail);
      },
    });
  }

  // if (queryLogin.isPending) {
  //   return <LoadingLayout />;
  // }

  return (
    <BackgroundLayout mask={<AuthMaskLayout />}>
      <div
        className="m-auto p-8 py-12 flex flex-col gap-12 
      max-sm:w-3/4 max-md:w-3/5 md:w-3/5 max-w-[400px]
      rounded-3xl bg-white
      "
      >
        <div
          className="card-header text-center
        "
        >
          <div className="w-1/2 m-auto">
            <img src={GEAR_ORIGINAL} alt="logo-gear-white" />
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit} id="form-login">
            <FormContainer className="gap-8">
              <Input
                showLabel={false}
                type="email"
                name="email"
                placeholder={t("email")}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={t(formik.errors.email!)}
                className="bg-gray-50"
              />
              <Input
                showLabel={false}
                type="password"
                name="password"
                placeholder={t("password")}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={t(formik.errors.password!)}
                className="bg-gray-50"
              />
              <div className="flex justify-between  ">
                <div className=" flex-1 flex gap-2 items-center justify-start">
                  <input type="checkbox" name="rememberMe" id="rememberMe" className="w-auto" />
                  <label htmlFor="rememberMe" className="opacity-60">
                    {t("rememberMe")}
                  </label>
                </div>
                <div className="flex justify-end py-1 px-2  rounded-full hover:bg-my-yellow-400">
                  <Link to="/auth/recover-password" className="inline-block text-black">
                    {t("forgetPassword")}
                  </Link>
                </div>
              </div>
            </FormContainer>
          </form>
        </div>
        <div className=" flex flex-wrap gap-2 justify-center items-center">
          <Button
            type="submit"
            form="form-login"
            className="bg-my-yellow-400 w-36"
            disabled={queryLogin.isPending}
            loading={queryLogin.isPending}
            loadingProps={{color: "white"}}
          >
            {t("login")}
          </Button>
        </div>
      </div>
    </BackgroundLayout>
  );
};
