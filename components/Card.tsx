import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropDown from "./ActionDropDown";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <div className="file-card">
      <div className="flex justify-between">
        <Link href={file.url} target="_blank">
          <Thumbnail
            type={file.type}
            extension={file.extension}
            url={file.url}
            className="!size-20"
            imageClassName="!size-11"
          />
        </Link>
        <div className="flex flex-col items-end justify-between">
          <ActionDropDown file={file} />
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="file-card-details">
        <Link href={file.url} target="_blank">
          <p className="subtitle-2 line-clamp-1">{file.name}</p>
        </Link>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
        <p className="caption line-clamp-1 text-light-200">
          By: {file.owner.fullName}
        </p>
      </div>
    </div>
  );
};
export default Card;
