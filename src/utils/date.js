const options = { year: 'numeric', month: 'long', day: 'numeric' };
const date = new Date();

const currentDate = date.toLocaleDateString('pt-br', {
  ...options,
  month: 'numeric',
});
export default currentDate;
