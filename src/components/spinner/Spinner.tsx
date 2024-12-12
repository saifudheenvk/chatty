import '@components/spinner/Spinner.scss';
import { FC } from 'react';

const Spinner:FC<{ bgColor?: string }> = ({ bgColor }) => {
  return (
    <>
      <div className="spinner">
        <div className="bounce1" style={{ backgroundColor: `${bgColor || '#50b5ff'}` }}></div>
        <div className="bounce2" style={{ backgroundColor: `${bgColor || '#50b5ff'}` }}></div>
        <div className="bounce3" style={{ backgroundColor: `${bgColor || '#50b5ff'}` }}></div>
      </div>
    </>
  );
};

export default Spinner;
