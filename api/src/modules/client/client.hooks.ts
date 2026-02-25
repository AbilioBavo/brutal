import { Prisma } from "@prisma/client";
import Handlebars from "handlebars";
import path from "path";
import fs from "fs";
import clientService from "./client.service";
import { AfterCreateOneHookArgs, EmailService } from "arkos/services";

const rsvpTemplatePath = path.resolve(process.cwd(), "templates", "rsvp-confirmation.hbs");
const rsvpTemplateSource = fs.readFileSync(rsvpTemplatePath, "utf-8");
const rsvpTemplate = Handlebars.compile(rsvpTemplateSource);
const email = new EmailService({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : undefined,
    secure: process.env.EMAIL_SECURE === "true",
    ...(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD
        ? {
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        }
        : {}),
    name: process.env.EMAIL_NAME,
});
export const beforeFindOne = [];

export const afterFindOne = [];

export const onFindOneError = [];

export const beforeUpdateOne = [];

export const afterUpdateOne = [];

export const onUpdateOneError = [];

export const beforeCreateOne = [];

export const afterCreateOne = [
    async ({ result: res, }: AfterCreateOneHookArgs<Prisma.ClientDelegate>) => {
        const html = rsvpTemplate({
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            phone: res.phone,
            bestieFirstName: res.bestieFirstName,
            bestieLastName: res.bestieLastName,
            bestiePhone: res.bestiePhone,
            siteUrl: process.env.SITE_URL || "https://brutalpinktable.com",
            year: new Date().getFullYear(),
        });

        await email.send({
            to: res.email,
            subject: "💗 RSVP Confirmado — Pink Table",
            html,
        })

        console.log("Resultado: ", res)
    }
];

export const onCreateOneError = [];

export const beforeCreateMany = [];

export const afterCreateMany = [];

export const onCreateManyError = [];

export const beforeCount = [];

export const afterCount = [];

export const onCountError = [];

export const beforeFindMany = [];

export const afterFindMany = [];

export const onFindManyError = [];

export const beforeUpdateMany = [];

export const afterUpdateMany = [];

export const onUpdateManyError = [];

export const beforeDeleteOne = [];

export const afterDeleteOne = [];

export const onDeleteOneError = [];

export const beforeDeleteMany = [];

export const afterDeleteMany = [];

export const onDeleteManyError = [];
