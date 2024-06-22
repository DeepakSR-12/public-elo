import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input as NextInput,
} from "@nextui-org/react";
import { Form, FormControl, FormItem, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { earningReportSchema } from "@/constants";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EarningReportModal({
  isOpen,
  onOpenChange,
  closeModal,
  fetchCompanies,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  closeModal: () => void;
  fetchCompanies: () => void;
}) {
  const form = useForm<z.infer<typeof earningReportSchema>>({
    resolver: zodResolver(earningReportSchema),
    defaultValues: {
      companyName: "",
    },
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setUploadedFile(selectedFile);
  };

  const onSubmit = async (values: z.infer<typeof earningReportSchema>) => {
    try {
      if (!uploadedFile) {
        return toast.error("Please upload an earning report.");
      }
      const formData = new FormData();
      formData.append("companyName", values.companyName);
      if (uploadedFile) {
        formData.append("earningReport", uploadedFile);
      }

      await axios.post("/api/initialize", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchCompanies();

      setUploadedFile(null);
      closeModal();
      toast.success("Earning Report is added!");
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add an Earning Report
            </ModalHeader>
            <ModalBody>
              <Form {...form}>
                <form
                  className="rounded-lg w-full flex flex-col gap-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    name="companyName"
                    render={({ field }) => (
                      <FormItem className="col-span-12 lg:col-span-10">
                        <FormControl className="m-0 p-0">
                          <NextInput
                            label="Company Name"
                            variant="bordered"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid w-full mt-3 items-center gap-2">
                    <Label htmlFor="report">Earnings Report</Label>
                    <Input
                      className="h-10 mt-2"
                      id="report"
                      type="file"
                      onChange={onFileChange}
                    />
                  </div>
                  <ModalFooter className="px-2">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="secondary"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Add
                    </Button>
                  </ModalFooter>
                </form>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
