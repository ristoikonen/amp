/* eslint-disable */
import FV from './FV';

export default {
  title: "FV",
};

export const Default = () => <FV rate={0.08} pv = {2000} nper = {5} />;

Default.story = {
  name: 'default',
};
