import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !message || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Nama, email, dan pesan wajib diisi.",
        },
        { status: 400 },
      );
    }

    const userEmail = process.env.EMAIL_USER;
    const passApp = process.env.EMAIL_PASS;

    if (!userEmail || !passApp) {
      console.error(
        "Missing EMAIL_USER or EMAIL_PASS in environment variables",
      );
      return NextResponse.json(
        { success: false, error: "Konfigurasi server email bermasalah. Pastikan EMAIL_USER dan EMAIL_PASS ada di file .env" },
        { status: 500 },
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: passApp,
      },
    });

    // Setup email data
    const mailOptions = {
      from: `"${name}" <${userEmail}>`,
      to: "nurhadiimamuddin@gmail.com",
      replyTo: email,
      subject: `Pesan Baru dari My portofolio: ${name}`,
      text: `Anda mendapat pesan baru dari form kontak My portofolio.\n\nNama: ${name}\nEmail Pengirim: ${email}\n\nPesan:\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim!",
    });

  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server saat mengirim email." },
      { status: 500 },
    );
  }
}
