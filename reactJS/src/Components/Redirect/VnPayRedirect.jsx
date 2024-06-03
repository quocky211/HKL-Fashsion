import "./Redirect.css";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { vnPayReturn, momoRedirect } from '../../actions/orders';
// import Loading from '../../../components/loading';
// import Layout from '../../../components/layout';
// import styles from '../../../styles/vnpay.module.scss';
const VnPayRedirect = () => {
  
//   const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  useEffect(() => {
    const checkSum = async () => {
      try {
        const res = await vnPayReturn();
        console.log(res);
        if (res.code === '00') {
          setStatus(
            'Your payment was successfully processed. Thank you for your purchase!✅'
          );
        } else {
          setStatus(
            'We apologize, but there was an issue processing your payment. Please try again or contact our support team for assistance.❌'
          );
        }
        //process momo verify
        // const res = await momoRedirect();
        // console.log(res);
        // if (res.resultCode === '0') {
        //   setStatus(res.message);
        // } else {
        //   setStatus(res.error);
        // }
      } catch (e) {
        console.log(e);
        setStatus(
          'We regret to inform you that an error occurred during the payment process. Kindly contact our support team for further assistance and resolution.❌'
        );
      }
      // setLoading(false);
    };
    checkSum();
  }, []);
  return (
    <div>
      {/* {loading && <Loading />} */}
      <div>{status && status}</div>{' '}
      <Button variant="primary"><a href='/'>Ấn vào đây để quay về trang chủ</a></Button>
    </div>
  );
};

export default VnPayRedirect;