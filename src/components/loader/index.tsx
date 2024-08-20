import React from 'react'
import { Spinner } from "../spinner";

type LoadingProps = {
    loading:boolean;
    children:React.ReactNode
};

export const Loader = ({loading,children}: LoadingProps) => {
  return loading ? (
    <div className="w-full py-5 flex justify-center">
        <Spinner />
    </div>
  ) : (
    children
  );
};
