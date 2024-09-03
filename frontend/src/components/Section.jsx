import PropTypes from 'prop-types';

export const Section = ({
	style ,
	children
}) => {
  return (
    <section className={`border-dark-gray  border-[0.002rem] p-5 ${style}`}>
		{children}
	</section>
  );
};
Section.propTypes = {
	style : PropTypes.string , 
	children : PropTypes.node,


};