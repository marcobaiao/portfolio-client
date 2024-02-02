function AdminPanelHeader({ children, headerTitle }) {
  return (
    <div className="flex justify-between items-center mb-7 md:sticky md:top-0 md:z-10 p-5 md:px-10 md:py-7 bg-white shadow-lg">
      <h1 className="text-3xl font-semibold font-heading text-[2.8rem]">
        {headerTitle}
      </h1>

      {children}
    </div>
  );
}

export default AdminPanelHeader;
