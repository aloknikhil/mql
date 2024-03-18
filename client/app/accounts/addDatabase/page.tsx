"use client";

import CodeBlock from "@/app/components/codeBlock";
import FileUploader from "@/app/components/fileUploader";
import { uploadSchema } from "@/app/lib/service";
import { COMMAND, CURL } from "@/app/utils/constant";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddDatabase = () => {
  const [file, setFile] = useState<any>(null);
  const [databaseName, setDatabaseName] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const { push } = useRouter();

  const handleFileChange = (event: React.ChangeEvent<any>) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    setShowLoader(true);
    try {
      const formData = new FormData();
      formData.append("database_name", databaseName);
      formData.append("file", file);

      const res = await uploadSchema(formData);
      toast.success("Upload successfully");
      push("/accounts/home");
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row mt-8">
        <div className="my-auto w-full md:w-1/2">
          <div className="w-4/5">
            <p className="text-3xl font-bold text-[#2b4499]">
              Unleash the true potential of your data today!
            </p>
            <p className="text-2xl mt-8 text-[#0a2355]">
              Easily upload your database schema and experience the power of our
              AI. Empower your database interactions with power of AI. <br />{" "}
            </p>
          </div>
        </div>
        <div className="flex my-auto align-middle justify-center w-full md:w-1/2">
          <Image
            src="/database_3.jpg"
            alt="database"
            className="items-center"
            width={700}
            height={700}
          />
        </div>
      </div>
      <div>
        <div className="mt-8">
          <h2 className="text-4xl font-bold mb-6">Steps</h2>
        </div>
        <ul role="list" className="space-y-3">
          <li className="overflow-hidden bg-orange-50 px-4 pt-8 pb-4 shadow sm:rounded-md sm:px-6">
            <div>
              <p className="text-lg">
                1. Copy the curl below and run it on your system. It will fetch
                a bash script which will generate a schema file for you.
              </p>
              <div className="container mx-auto py-8 px-4">
                <CodeBlock codeString={CURL} language="bash" />
              </div>
            </div>
            <div>
              <p className="text-lg">
                2. Now copy the command below to run the bash script and provide
                the asked parameters. Run the command in the same directory in
                which you ran the curl command.
              </p>
              <div className="container mx-auto py-8 px-4">
                <CodeBlock codeString={COMMAND} language="bash" />
              </div>
            </div>
            <div>
              <p className="text-lg">
                3. Now upload the generated schema file to the form below.
              </p>
              <div className="container mx-auto py-8 px-4">
                <FileUploader
                  file={file}
                  handleFileChange={handleFileChange}
                  databaseName={databaseName}
                  handleUpload={handleUpload}
                  setDatabaseName={setDatabaseName}
                  showLoader={showLoader}
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddDatabase;
