import React from "react";
import {Access, useAccess} from "umi";

type JurisdictionProps = {
  tag: Auth
}

const Jurisdiction: React.FC<JurisdictionProps> = (props) => {
  const {children, tag} = props
  const access = useAccess()

  return (
    <Access accessible={access.canVisible(tag)}>
      {children}
    </Access>
  )
}


export default Jurisdiction

