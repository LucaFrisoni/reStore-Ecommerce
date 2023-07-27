'use client';
import { DetailId } from './FetchDetail.jsx';
import { Navbar } from '@/app/components/navbar/navbar.jsx';
import { Provider } from 'react-redux';
import store from '../../../../redux/store.js';
import { useParams } from 'next/navigation.js';

function Detail() {
  const params = useParams();

  return (
    <>
      <Navbar />
      <Provider store={store}>
        <section>
          <DetailId param={params.productId} />
        </section>
      </Provider>
    </>
  );
}

export default Detail;
