// CardSelection komponent
export default function CardSelection({
  imgUrl,
  title,
  description,
  onClick,
  isSelected,
}) {
  const selectedStyle = isSelected ? "ring-4 ring-primary bg-formbg" : ""; // Använder TailwindCSS för att visa en outline när kortet är valt
  return (
    <div
      className={`hcard bg-cardbg flex justify-center items-center sm:gap-5 gap-2 cursor-pointer ${selectedStyle} `}
      onClick={onClick}
    >
      <img
        src={imgUrl}
        alt={title}
        className="rounded-full w-20 sm:w-24 md:w-36"
      />
      <div className="flex flex-col justify-center items-start gap-1">
        <h2 className="text-3xl font-normal m-0">{title}</h2>
        <p className="sm:text-base text-xs">{description}</p>
      </div>
    </div>
  );
}
