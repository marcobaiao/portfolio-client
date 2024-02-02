function SectionTitle({
  title,
  color = "black",
  marginBottom = "10",
  textAlign = "center",
}) {
  return (
    <h2
      className={`text-[3.3rem] xl:text-[3.6rem] text-${color} font-semibold text-${textAlign} font-heading mb-${marginBottom} 2xl:text-[4rem] 3xl:text-[4.5rem]`}
    >
      {title}
    </h2>
  );
}

export default SectionTitle;
