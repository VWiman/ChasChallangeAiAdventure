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
      className={`hcard bg-cardbg flex justify-center items-center gap-5 cursor-pointer ${selectedStyle} `}
      onClick={onClick}
    >
      <img
        src={imgUrl}
        alt={title}
        className="w-[150px] h-[150px] rounded-full"
      />
      <div className="flex flex-col justify-center items-start gap-2">
        <h2 className="text-3xl font-normal">{title}</h2>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
}
