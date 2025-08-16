import React from 'react'
import { Card } from '../ui/card';

type Props = {
    children?: React.ReactNode;
    className?: string;
}

const CardWrapper = ({children}: Props) => {
  return (
    <Card>{children}</Card>
  )
}

export default CardWrapper