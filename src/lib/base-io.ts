import { Data } from "../data";
import { Pariah } from "../pariah";

export module BaseIO {
    export interface User<Custom> {
        id: string;
        email: string;
        custom_data: Custom;
    }
    export interface List<Item> {
        items: Array<Item>;
        metadata: ListMetadata;
    }
    export interface ListMetadata {
        count: number;
    }
    export interface RequestedPassword {
        forgot_password_token: string;
    }
    export interface Email {
        created_at: string;
        from_address: string;
        to_address: string;
        subject: string;
        html: string;
        text: string;
        id: number;
    }
    export interface File {
        created_at: string;
        id: string;
        name: string;
        size: number;
        extension: string;
    }
    export interface Image {
        created_at: string;
        id: string;
        name: string;
        height: number;
        width: number;
        size: number;
    }
    export enum ImageFormat {
        PNG = "png",
        JPG = "jpg",
    }
    export interface Form {
        created_at: string;
        id: string;
        name: string;
    }
    export interface FormSubmission {
        created_at: string;
        id: string;
        fields: Record<string, string>;
        files: Array<string>;
    }
    export interface MailingList {
        unsubscribe_redirect_url: string;
        created_at: string;
        id: string;
        name: string;
        emails: Array<string>;
    }
    export interface OutgoingMailingListEntry {
        failed: Array<string>;
        sent: Array<string>;
    }
    export const Url = new URL("https://api.base-api.io/v1/");
    export class API extends Pariah {
        public token: string;
        constructor(token: string) {
            super(Url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            this.token = token;
        }
        public async createUser<Custom>(
            email: string,
            password: string,
            confirmation: string,
            custom_data: Custom
        ): Promise<Data<User<Custom>>> {
            return this.post.json<User<Custom>>("/users", {
                email,
                password,
                confirmation,
                custom_data,
            });
        }

        public async updateUser<Custom>(
            id: string,
            email?: string,
            custom_data?: Custom
        ): Promise<Data<User<Custom>>> {
            return this.post.json<User<Custom>>(`/users/:id`, {
                ":id": id,
                email,
                custom_data,
            });
        }

        public async getUser<Custom>(id: string): Promise<Data<User<Custom>>> {
            return this.get.json<User<Custom>>(`/users/:id`, {
                ":id": id,
            });
        }

        public async deleteUser(id: string): Promise<Data<User<never>>> {
            return this.delete.json<User<never>>(`/users/:id`, {
                ":id": id,
            });
        }

        public async listUsers(
            page?: number,
            perPage?: number
        ): Promise<Data<List<User<never>>>> {
            return this.get.json<List<User<never>>>(`/users`, {
                page,
                per_page: perPage,
            });
        }

        public async requestPassword(
            email: string
        ): Promise<Data<RequestedPassword>> {
            return this.post.json<RequestedPassword>(`/password`, {
                email,
            });
        }

        public async resetPassword(
            token: string,
            password: string,
            confirmation: string
        ): Promise<Data<User<never>>> {
            return this.put.json<User<never>>(`/password`, {
                token,
                password,
                confirmation,
            });
        }

        public async sendEmail(
            from: string,
            to: string,
            subject: string,
            html?: string,
            text?: string,
            file?: string
        ) {
            return this.post.json<Email>(`/emails`, {
                from,
                to,
                subject,
                html,
                text,
                file,
            });
        }

        public async listSentEmails(page: number, perPage: number) {
            return this.get.json<List<Email>>(`/emails`, {
                page,
                per_page: perPage,
            });
        }

        public async session(
            email: string,
            password: string
        ): Promise<Data<User<never>>> {
            return this.post.json<User<never>>(`/sessions`, {
                email,
                password,
            });
        }

        public async uploadFile(file: string): Promise<Data<File>> {
            return this.post.json<File>(`/files`, {
                file,
            });
        }

        public async downloadFile(id: string): Promise<Data<File>> {
            return this.get.json<File>(`/files/:id/download`, {
                ":id": id,
            });
        }

        public async fileDetails(id: string): Promise<Data<File>> {
            return this.get.json<File>(`/files/:id`, {
                ":id": id,
            });
        }

        public async deleteFile(id: string): Promise<Data<File>> {
            return this.delete.json<File>(`/files/:id`, {
                ":id": id,
            });
        }

        public async listFiles(page: number, perPage: number) {
            return this.get.json<List<File>>(`/files`, {
                page,
                per_page: perPage,
            });
        }

        public async uploadImage(image: string): Promise<Data<Image>> {
            return this.post.json<Image>(`/images`, {
                image,
            });
        }

        public getImage(
            id: string,
            crop?: string,
            resize?: string,
            quality?: number,
            format?: ImageFormat
        ) {
            return this.get.json<Image>(`/images/:id/image`, {
                ":id": id,
                crop,
                resize,
                quality,
                format,
            });
        }

        public async imageDetails(id: string): Promise<Data<Image>> {
            return this.get.json<Image>(`/images/:id`, {
                ":id": id,
            });
        }

        public async deleteImage(id: string): Promise<Data<Image>> {
            return this.delete.json<Image>(`/images/:id`, {
                ":id": id,
            });
        }

        public async listImages(
            page: number,
            perPage: number
        ): Promise<Data<List<Image>>> {
            return this.get.json<List<Image>>(`/images`, {
                page,
                per_page: perPage,
            });
        }

        public async createForm(name: string): Promise<Data<Form>> {
            return this.post.json<Form>(`/forms`, {
                name,
            });
        }

        public async createFormSubmission(
            id: string,
            file: string,
            key: Record<string, string>
        ): Promise<Data<FormSubmission>> {
            return this.post.json<FormSubmission>(`/forms/:id/submit`, {
                ":id": id,
                file,
                ...key,
            });
        }

        public async formDetails(id: string): Promise<Data<Form>> {
            return this.get.json<Form>(`/forms/:id`, {
                ":id": id,
            });
        }

        public async deleteForm(id: string): Promise<Data<Form>> {
            return this.delete.json<Form>(`/forms/:id`, {
                ":id": id,
            });
        }

        public async listForms(page: number, perPage: number) {
            return this.get.json<List<Form>>(`/forms`, {
                page,
                per_page: perPage,
            });
        }

        public async formSubmissionDetails(
            formId: string,
            submissionId: string
        ): Promise<Data<FormSubmission>> {
            return this.get.json<FormSubmission>(
                `/forms/:id/submissions/:submissionId`,
                {
                    ":id": formId,
                    ":submissionId": submissionId,
                }
            );
        }

        public async updateFormSubmission(
            formId: string,
            submissionId: string,
            file: string,
            key: Record<string, string>
        ): Promise<Data<FormSubmission>> {
            return this.put.json<FormSubmission>(
                `/forms/:id/submissions/:submissionId`,
                {
                    ":id": formId,
                    ":submissionId": submissionId,
                    file,
                    ...key,
                }
            );
        }

        public async deleteFormSubmission(
            formId: string,
            submissionId: string
        ): Promise<Data<FormSubmission>> {
            return this.delete.json<FormSubmission>(
                `/forms/:id/submissions/:submissionId`,
                {
                    ":id": formId,
                    ":submissionId": submissionId,
                }
            );
        }

        public async listFormSubmissions(
            formId: string,
            page?: number,
            perPage?: number
        ): Promise<Data<List<FormSubmission>>> {
            return this.get.json<List<FormSubmission>>(
                `/forms/:id/submissions`,
                {
                    ":id": formId,
                    page,
                    per_page: perPage,
                }
            );
        }

        public async mailingListDetails(id: string): Promise<Data<MailingList>> {
            return this.get.json<MailingList>(`/mailing_lists/:id`, {
                ":id": id,
            });
        }

        public async listMailingLists(page?: number, perPage?: number) {
            return this.get.json<List<MailingList>>(`/mailing_lists`, {
                page,
                per_page: perPage,
            });
        }

        public async subscribeToMailingList(
            id: string,
            email: string
        ): Promise<Data<MailingList>> {
            return this.post.json<MailingList>(`/mailing_lists/:id/subscribe`, {
                ":id": id,
                email,
            });
        }

        public async unsubscribeFromMailingList(
            id: string,
            email: string
        ): Promise<Data<MailingList>> {
            return this.post.json<MailingList>(
                `/mailing_lists/:id/unsubscribe`,
                {
                    ":id": id,
                    email,
                }
            );
        }

        public async sendEmailToMailingList(
            id: string,
            from: string,
            subject: string,
            html: string,
            text: string
        ): Promise<Data<OutgoingMailingListEntry>> {
            return this.post.json<OutgoingMailingListEntry>(
                `/mailing_lists/:id`,
                {
                    ":id": id,
                    from,
                    subject,
                    html,
                    text,
                }
            );
        }

        public async retrieveMailingList(id: string): Promise<Data<MailingList>> {
            return this.get.json<MailingList>(`/mailing-lists/:id`, {
                ":id": id,
            });
        }
    }
}
