import path from 'path';
import fs from 'fs/promises';
import bcrypt from "bcrypt";
import { UserRoundPlus } from 'lucide-react';

export async function uploadFileOnServer(file: File | undefined, folderName: string) {
    let newPath = '';
    if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name}`;

        const uploadDir = path.join(process.cwd(), 'public', folderName); // مسیر درست
        await fs.mkdir(uploadDir, { recursive: true }); // اگر پوشه نبود بساز

        newPath = `/${folderName}/${filename}`;
        await fs.writeFile(path.join(uploadDir, filename), buffer);
    }
    return newPath;
}

export async function deleteFileFromServer(filePath: string | undefined) {
    if (!filePath) return;

    try {
        const fullPath = path.join(process.cwd(), 'public', filePath);
        await fs.unlink(fullPath);
        console.log(`فایل ${filePath} حذف شد`);
    } catch (error) {
        console.error(`خطا در حذف فایل ${filePath}:`, error);
    }
}

// پاک‌سازی  فایل ها
export const cleanFile = (file: File | null) => {
    if (!file || file.size === 0 || file.name === 'undefined') return undefined;
    return file;
};

// پاک‌سازی آرایه فایل‌ها
export const cleanFileArray = (files: File[]) => {
    const validFiles = files.filter((file) => file && file.size > 0 && file.name !== 'undefined');
    return validFiles;
};

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const comparePassword = async (inputPassword: string, userPassword: string) => {
    const valid = await bcrypt.compare(inputPassword, userPassword);
    return valid;
}