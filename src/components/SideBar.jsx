import { IoMdHome } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fecthTags } from "../firebase/queries/notes";
import { BiPurchaseTag } from "react-icons/bi";
const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isHome = currentPath === "/";
  const isArchive = currentPath === "/archived-notes";
  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: fecthTags,
  });
  return (
    <div className="border-r bg-primary pb-8 border-dark h-screen gap-8 flex flex-col items-start px-5 py-6">
      <div className="flex items-center justify-center">
        <img src="/images/logo.svg" className="-mr-14" alt="logo" />
        <p className="text-primary font-pacifico text-2xl tracking-[-0.2px]">
          Notes
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="border-b flex pb-4 flex-col gap-2 border-dark">
          <div
            className={`flex ${
              isHome ? "border-primary bg-secondary rounded-lg border" : ""
            } px-3 py-2 items-center justify-between cursor-pointer`}
            onClick={() => navigate("/")}
          >
            <div className="flex items-center justify-center">
              <IoMdHome
                className={`${isHome ? "text-accent" : "text-primary"} w-6 h-6`}
              />
              <span className="text-primary font-inter font-medium pl-1.5 text-sm">
                All Notes
              </span>
            </div>
            <MdKeyboardArrowRight className="text-primary w-6 h-6" />
          </div>

          <div
            className={`flex ${
              isArchive ? "border-primary bg-secondary rounded-lg border" : ""
            } px-3 py-2 items-center justify-between cursor-pointer`}
            onClick={() => navigate("/archived-notes")}
          >
            <div className="flex items-center w-full">
              <IoArchiveOutline
                className={`${
                  isArchive ? "text-accent" : "text-primary"
                } w-6 h-6`}
              />
              <span className="text-primary font-inter font-medium pl-1.5 text-sm">
                Archived Notes
              </span>
            </div>
            <MdKeyboardArrowRight className="text-primary w-6 h-6" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col items-start gap-4">
          <span className="text-placeholder font-inter font-medium text-sm">
            Tags
          </span>

          {isLoading && <p className="text-tertiary text-sm">Yükleniyor...</p>}
          {isError && <p className="text-red-400 text-sm">Tagler alınamadı.</p>}

          <div className="flex flex-col items-start w-full gap-3 overflow-y-auto max-h-[60vh] custom-scrollbar">
            {!isLoading && !isError && tags?.length > 0 ? (
              tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 justify-start cursor-pointer"
                  onClick={() => navigate(`/selected-tag/${tag}`)}
                >
                  <BiPurchaseTag className="text-primary w-7 h-7" />
                  <span className="text-primary font-inter font-medium text-sm">
                    {tag}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-tertiary text-sm">Henüz etiketli not yok.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
