import React from 'react'
import { Spinner } from "../spinner";
import { cn } from '@/lib/utils';

type LoadingProps = {
    loading:boolean;
    children:React.ReactNode
    classname?:string
    noPadding?:boolean
};

export const Loader = ({loading,children,classname,noPadding}: LoadingProps) => {
  return loading ? (
    <div className={cn(classname || "w-full py-5 flex justify-center")}>
        <Spinner noPadding={noPadding} />
    </div>
  ) : (
    children
  );
};
