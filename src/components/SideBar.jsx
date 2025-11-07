import { IoMdHome } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { CiHashtag } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fecthTags } from "../firebase/queries/notes";

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
  console.log(tags);
  return (
    <div className="border-r bg-[#0E121B] pb-8 border-r-[#232530] h-screen gap-8 flex flex-col items-start px-5 py-6">
      <div className="flex items-center justify-center">
        <img src="/images/logo.svg" className="-mr-14" alt="logo" />
        <p className="text-white font-pacifico text-2xl tracking-[-0.2px]">
          Notes
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="border-b flex pb-4 flex-col gap-2 border-b-[#232530]">
          <div
            className={`flex ${
              isHome ? "border-[#E0E4EA] bg-[#232530] rounded-lg border" : ""
            } px-3 py-2 items-center justify-between cursor-pointer`}
            onClick={() => navigate("/")}
          >
            <div className="flex items-center justify-center">
              <IoMdHome
                className={`${
                  isHome ? "text-[#335CFF]" : "text-[#E0E4EA]"
                } w-6 h-6`}
              />
              <span className="text-[#E0E4EA] font-inter font-medium pl-1.5 text-sm">
                All Notes
              </span>
            </div>
            <MdKeyboardArrowRight className="text-[#E0E4EA] w-6 h-6" />
          </div>

          <div
            className={`flex ${
              isArchive ? "border-[#E0E4EA] bg-[#232530] rounded-lg border" : ""
            } px-3 py-2 items-center justify-between cursor-pointer`}
            onClick={() => navigate("/archived-notes")}
          >
            <div className="flex items-center w-full">
              <IoArchiveOutline
                className={`${
                  isArchive ? "text-[#335CFF]" : "text-[#E0E4EA]"
                } w-6 h-6`}
              />
              <span className="text-[#E0E4EA] font-inter font-medium pl-1.5 text-sm">
                Archived Notes
              </span>
            </div>
            <MdKeyboardArrowRight className="text-[#E0E4EA] w-6 h-6" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col items-start gap-4">
          <span className="text-[#717784] font-inter font-medium text-sm">
            Tags
          </span>

          {isLoading && <p className="text-[#99A0AE] text-sm">Yükleniyor...</p>}
          {isError && <p className="text-red-400 text-sm">Tagler alınamadı.</p>}

          <div className="flex flex-col items-start gap-3 overflow-y-auto max-h-[60vh] custom-scrollbar">
            {!isLoading && !isError && tags?.length > 0 ? (
              tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 justify-start cursor-pointer"
                  onClick={() => navigate(`/selected-tag/${tag}`)}
                >
                  <CiHashtag className="text-[#E0E4EA] w-5 h-5" />
                  <span className="text-[#E0E4EA] font-inter font-medium text-sm">
                    {tag}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-[#99A0AE] text-sm">Henüz etiketli not yok.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
