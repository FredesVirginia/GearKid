import React from "react";
import { ILoadingProps, LoadingRing } from "../loaders/LoadingRing";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingProps?: ILoadingProps;
}

export const Button: React.FC<Props> = ({ ...props }) => {
  return <button {...props}>{props.loading ? <LoadingRing {...props.loadingProps} /> : props.children}</button>;
};
