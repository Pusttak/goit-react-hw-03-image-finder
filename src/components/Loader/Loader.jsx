import s from './Loader.module.scss';

const Loader = () => (
  <div className={s.loader}>
    <div className={s.spiner}></div>
    <p className={s.text}>Loading...</p>
  </div>
);

export default Loader;
