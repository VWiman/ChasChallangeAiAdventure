const Button = ({ size = "base", color = "primary", radius = "rounded-none", disabled = false, children, onClick }) => {
  return (
    <button className={`button ${size} ${color} ${radius}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;