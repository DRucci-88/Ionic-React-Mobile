import React, { useEffect, useState } from "react";
import {
  IonCard, IonCol,
  IonContent, IonGrid, IonIcon,
  IonImg,
  IonItem, IonItemOption, IonItemOptions,
  IonItemSliding,
  IonPage,
  IonRow
} from "@ionic/react";

import './Favorite.scss';
import AppBar from "../components/AppBar";
import { FavFirebase } from "../data/favFirebase";
import { trash } from "ionicons/icons";

const Favorite: React.FC = () => {

  // const [favList, setFavList] = useState<FavFirebase[]>([
  //   {
  //     id: 'cf665dda5068a07d26ccfda829588474',
  //     name: 'Coffee Cabinets (Rhode Island-Style Coffee Milkshakes)',
  //     image: 'https://edamam-product-images.s3.amazonaws.com/web-img/6b0/6b0e1ae1cad3ec26ac8814052ea8fe0c-s.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLWVhc3QtMSJHMEUCIQC8YIVsh0aSQK7cIStGEn7t5l6Q9pv3Z6%2FXW7xg7HPuwQIgXCszYfUqTCP7bgKFcwS95pPP%2BfE9wmCoC2B44yBPMZUq0gQIYBAAGgwxODcwMTcxNTA5ODYiDKQ5pNFHmW6ovd6RXSqvBCKgtBzVqDPXqpo6sLG%2Bu%2Bqgs3HMjxYITsstnsVKmdqZ%2FbKWqAvnphZwuE5gTTuPq4shH5BBhobqm0mbodR%2FIsIwTNShfhiTPWw3eloS5TLc10cgk3kAg780XLcq5gi0EDaQg7bBp3tF3Xy1IX%2BrK%2BdE6r1GcHncHWYUKqZZazYJ26Ia9TDmXj07%2Fxk4EcjLYqzLLJ1cQywgWqDMMIvPebC9LaYiwYafteIAtTHKKVWznDi4NSlW3t0E2cHr0c5Hh9WjUDdnDwB7GGuCWdS%2FYTbCwtOnTs5fvOjNSmdGFsOIIoOseKRWgEWMm5UuNllFN%2BpHTkY545NP8KwhUb4OZtCWK1u9ipz4yvAnCoh57IPLWbiJVqALAMkS3C1NnpflkRqe2Qoi8y2EuSfo3eygRpdVwJwYjiyY14Fu7kODrFLgmnWfzO9sMgrEIgXdEB1vBAaksWl4ALum8MQp%2Bw59jiKe8EjqfvSbjsiJ2h%2BLvJNxXFXLt1tMeoThULDzG7O3K5ho5lqeYTyebnxNy0WiAMetBBrU5jca4fDCQMWAijI5vXKBjEw4EHGmJ4I5gTZIavP8EhsorRHpRlg1QECbXtDlg%2BX403i6hWi6nktWCnp3WCoVL4LEu4sXWevUNgDXM4bQz46kmoNKv%2Fq%2BV3%2FGC2%2FFMo5O7zI8PokijG8bEBoLsXvkBDRAbdlezfJV9qLZfvnWdhVN02HWC8otOYvEUhKiJ8hyb0yyWi9koZeqLCAwsrOulAY6qQGf9ku6WX9BL%2ByJ1NOv2JVsWsPN0aXeaRSwJo%2FKTSwmThWKc2drAfeSih9CdPACVurjlbEX4Ns4H9L3dIe06DsNXxR7yV5FhMKy93KBJ4vQAAq%2BNP%2FlIUgAqvFBGfJK6Ucl7WBG1uU90u%2F7gYnMfW%2BA2jvWuEiiYqivlr6H7E1IsiD3BoZfyoNCVE8u1IH7C3Yh3BD3kYlOlLW6xGv%2FyyDqLn962ZmFnIAK&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220523T153805Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFI7LAVLRE%2F20220523%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7052032a34c62945d5889a291ee8b13792f50d461e6ba1fde437d2cffde06dc2'
  //   },
  //   {
  //     id: '20022d91be0968092a8eab1aceee81be',
  //     name: 'Pasta alla Gricia Recipe',
  //     image: 'https://edamam-product-images.s3.amazonaws.com/web-img/bb5/bb5bad0cbcb94ad2ef0895d444f30291-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHcaCXVzLWVhc3QtMSJHMEUCIQC8YIVsh0aSQK7cIStGEn7t5l6Q9pv3Z6%2FXW7xg7HPuwQIgXCszYfUqTCP7bgKFcwS95pPP%2BfE9wmCoC2B44yBPMZUq0gQIYBAAGgwxODcwMTcxNTA5ODYiDKQ5pNFHmW6ovd6RXSqvBCKgtBzVqDPXqpo6sLG%2Bu%2Bqgs3HMjxYITsstnsVKmdqZ%2FbKWqAvnphZwuE5gTTuPq4shH5BBhobqm0mbodR%2FIsIwTNShfhiTPWw3eloS5TLc10cgk3kAg780XLcq5gi0EDaQg7bBp3tF3Xy1IX%2BrK%2BdE6r1GcHncHWYUKqZZazYJ26Ia9TDmXj07%2Fxk4EcjLYqzLLJ1cQywgWqDMMIvPebC9LaYiwYafteIAtTHKKVWznDi4NSlW3t0E2cHr0c5Hh9WjUDdnDwB7GGuCWdS%2FYTbCwtOnTs5fvOjNSmdGFsOIIoOseKRWgEWMm5UuNllFN%2BpHTkY545NP8KwhUb4OZtCWK1u9ipz4yvAnCoh57IPLWbiJVqALAMkS3C1NnpflkRqe2Qoi8y2EuSfo3eygRpdVwJwYjiyY14Fu7kODrFLgmnWfzO9sMgrEIgXdEB1vBAaksWl4ALum8MQp%2Bw59jiKe8EjqfvSbjsiJ2h%2BLvJNxXFXLt1tMeoThULDzG7O3K5ho5lqeYTyebnxNy0WiAMetBBrU5jca4fDCQMWAijI5vXKBjEw4EHGmJ4I5gTZIavP8EhsorRHpRlg1QECbXtDlg%2BX403i6hWi6nktWCnp3WCoVL4LEu4sXWevUNgDXM4bQz46kmoNKv%2Fq%2BV3%2FGC2%2FFMo5O7zI8PokijG8bEBoLsXvkBDRAbdlezfJV9qLZfvnWdhVN02HWC8otOYvEUhKiJ8hyb0yyWi9koZeqLCAwsrOulAY6qQGf9ku6WX9BL%2ByJ1NOv2JVsWsPN0aXeaRSwJo%2FKTSwmThWKc2drAfeSih9CdPACVurjlbEX4Ns4H9L3dIe06DsNXxR7yV5FhMKy93KBJ4vQAAq%2BNP%2FlIUgAqvFBGfJK6Ucl7WBG1uU90u%2F7gYnMfW%2BA2jvWuEiiYqivlr6H7E1IsiD3BoZfyoNCVE8u1IH7C3Yh3BD3kYlOlLW6xGv%2FyyDqLn962ZmFnIAK&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220523T154024Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFI7LAVLRE%2F20220523%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=00197999ebe330a7f1ccf34701aa8ced05884c1eb532fe26cff7e44a52c07c88'
  //   }
  // ]);

  const [favList, setFavList] = useState<FavFirebase[]>([]);

  useEffect(() => {
    const stored: FavFirebase[] = JSON.parse(sessionStorage.getItem('fav')!)
    setFavList(stored)
  }, [])

  return (
    <IonPage>
      <AppBar title={'Favorite'} backButton={true} />
      <IonContent className="ion-padding">
        <IonCard className={'titleFav'}>
          <h2>Favorite</h2>
        </IonCard>

        {favList.length > 0 && favList.map((fav, index) => (
          <IonItemSliding key={fav.id}>
            <IonItemOptions slot={'end'}>
              <IonItemOption color={'primary'} onClick={() => ''}>
                <IonIcon slot={'icon-only'} icon={trash} />
              </IonItemOption>
            </IonItemOptions>

            <IonItem>
              <IonGrid className={''}>
                <IonRow>
                  <IonCol>
                    <IonImg src={fav.image} alt={fav.name} />
                  </IonCol>
                  <IonCol>
                    <h3>{fav.name}</h3>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>

          </IonItemSliding>
        ))}

        {/*{favList.map( (fav, index) => {*/}
        {/*  return (*/}
        {/*    <IonList className={'background_list'}>*/}
        {/*      <IonItem className="itemList">*/}
        {/*        <IonImg className={'images'} src={fav.image} alt={'image'}/>*/}
        {/*        /!*<IonImg src={fav.image} alt={fav.name} className={'image'}/>*!/*/}
        {/*        <IonLabel color="dark">{fav.name}</IonLabel>*/}
        {/*      </IonItem>*/}
        {/*    </IonList>*/}
        {/*  )*/}
        {/*})}*/}


      </IonContent>
    </IonPage>
  )
}

export default Favorite;