import React from 'react';
import {IonAlert} from "@ionic/react";

const AlertMsg: React.FC<{
  msg: string,
  alertCallBack: (errMsg: string) => void
}> = props => {

  const alertHandler = () =>
    props.alertCallBack("");


  return(
    <IonAlert
      isOpen={!!props.msg}
      message={props.msg}
      buttons={[
        {text: 'Okay', handler: alertHandler}
      ]}
      onDidDismiss={ alertHandler }
    />
  )
}

export default AlertMsg;