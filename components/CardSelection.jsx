// CardSelection komponent
export default function CardSelection({
  imgUrl,
  title,
  description,
  onClick,
  isSelected,
}) {
  const selectedStyle = isSelected ? "ring-4 ring-blue-500" : ""; // Använder TailwindCSS för att visa en outline när kortet är valt
  return (
    <div
      className={`bg-gray-100 w-[581px] h-[188px] flex justify-center items-center gap-10 cursor-pointer ${selectedStyle}`}
      onClick={onClick}
    >
      <img
        src={imgUrl}
        alt={title}
        className="w-[150px] h-[150px] rounded-full"
      />
      <div className="flex flex-col justify-center items-start gap-2 h-[128px]">
        <h2 className="text-3xl font-normal">{title}</h2>
        <p className="text-base w-[341px] h-[78px]">{description}</p>
      </div>
    </div>
  );
}
