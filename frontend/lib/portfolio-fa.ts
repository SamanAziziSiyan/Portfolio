import type { Experience, Project } from "@/lib/data";
import type { Locale } from "@/lib/locale";
import { companyName } from "@/lib/translations";

type ProjectText = Pick<Project, "name" | "kind" | "summary" | "contribution" | "visibility">;
type ExperienceText = Pick<Experience, "company" | "role" | "period" | "location" | "employment_type" | "workplace_type" | "summary" | "highlights">;

const projects: Record<string, ProjectText> = {
  blogina: {
    name: "Blogina", kind: "قالب آموزشی وردپرس", summary: "قالب تجاری وردپرس برای وب‌سایت‌های دوره‌محور.",
    contribution: "معماری، پیاده‌سازی طرح فیگما، امکانات وردپرس و تنظیمات قالب را به‌صورت مستقل توسعه دادم.",
    visibility: "قالب تجاری؛ کد منبع اختصاصی",
  },
  serione: {
    name: "Serione", kind: "قالب شرکتی وردپرس", summary: "قالب شرکتی با محتوا، فروشگاه و تجربه حساب کاربری قابل تنظیم.",
    contribution: "معماری قالب، فرانت‌اند، تنظیمات، امکانات المنتور و ووکامرس و فرایندهای حساب کاربری را به‌صورت مستقل توسعه دادم.",
    visibility: "قالب تجاری؛ کد منبع اختصاصی",
  },
  "clickchin-builder": {
    name: "ClickChin / سازنده کامپوننت", kind: "زیرسیستم پلتفرم", summary: "API لاراول و ویرایشگر Next.js برای ساخت، پیش‌نمایش و ذخیره صفحات فرود.",
    contribution: "API صفحات فرود و کامپوننت‌ها را در لاراول پیاده‌سازی کردم و در فرانت‌اند و ابزارهای توسعه مشارکت داشتم. پلتفرم کامل تولید و انتشار در مخزن دیگری است.",
    visibility: "زیرسیستم عمومی پاک‌سازی‌شده",
  },
  "amiramir-jewelry": {
    name: "AMIRAMIR Jewelry", kind: "قالب سفارشی وردپرس", summary: "قالب فروش جواهرات با مدل محتوا، تعاملات حساب کاربری، کاتالوگ و نوبت‌دهی.",
    contribution: "معماری قالب و بخش عمده پیاده‌سازی مدل محتوا، تنظیمات، حساب کاربری AJAX، علاقه‌مندی‌ها و رفتار فرانت‌اند را با همکاری سلیمان نادری انجام دادم.",
    visibility: "قالب عمومی پاک‌سازی‌شده",
  },
  "anar360-integration": {
    name: "یکپارچه‌سازی Anar360", kind: "یکپارچه‌سازی فروشگاه", summary: "نگاشت کاتالوگ یک سرویس خارجی به محصولات و دسته‌های ووکامرس.",
    contribution: "بخش‌های مهم دریافت از API، نگاشت دسته و ویژگی و به‌روزرسانی محصولات وردپرس و ووکامرس را همراه همکاران ساختم.",
    visibility: "افزونه عمومی پاک‌سازی‌شده",
  },
  "panjere-studio-theme": {
    name: "استودیو پنجره", kind: "قالب محتوایی وردپرس", summary: "قالب استودیو برای پروژه‌ها، نوشته‌ها و تماس با قالب‌های قابل استفاده مجدد وردپرس.",
    contribution: "بیشتر کد مخزن بررسی‌شده، از جمله قالب‌های PHP، ساختار محتوای پروژه و امکانات تماس را پیاده‌سازی کردم؛ اعتبار طراحی و همکاری دیگران جداگانه حفظ شده است.",
    visibility: "قالب عمومی پاک‌سازی‌شده",
  },
  "tebseo-theme": {
    name: "TEBSEO", kind: "قالب بازاریابی وردپرس", summary: "قالب سفارشی بازاریابی با بخش‌های واکنش‌گرا و فرایند درخواست تماس.",
    contribution: "مشارکت‌کننده اصلی تاریخچه موجود هستم؛ قالب و ابزارهای توسعه محلی را همراه همکاران ساختم.",
    visibility: "قالب عمومی پاک‌سازی‌شده",
  },
  "panjere-mini-cli": {
    name: "Panjere miniCli", kind: "ابزار توسعه‌دهنده", summary: "ابزار خط فرمان PHP برای راه‌اندازی وردپرس و تولید کد.",
    contribution: "روال‌های پوشه، Git و سرویس‌های وردپرس و تولید نوع نوشته و دسته‌بندی سفارشی را در یک ابزار گروهی پیاده‌سازی کردم.",
    visibility: "ابزار عمومی پاک‌سازی‌شده",
  },
  "igame-pwa": {
    name: "iGame PWA", kind: "برنامه مشتریان", summary: "فرانت‌اند Next.js برای جریان‌های مشتری، محصول، سفارش و کیف پول میان دو API.",
    contribution: "در کلاینت عمومی Next.js و TypeScript مشارکت قابل توجهی داشتم. این مخزن مالکیت سرویس‌های بک‌اند را ثابت نمی‌کند.",
    visibility: "مخزن تاریخی عمومی؛ بررسی حقوق انتشار باز است",
  },
  "amlak-arad-panel": {
    name: "پنل املاک آراد", kind: "رابط مدیریتی", summary: "رابط مدیریتی React متصل به افزونه API جداگانه وردپرس.",
    contribution: "در پیاده‌سازی فرانت‌اند مخزن React همکاری داشتم. جایگاه دقیق قرارداد کاری و دامنه کار Next.js از این منبع مشخص نیست.",
    visibility: "مخزن تاریخی عمومی؛ بررسی امنیت بک‌اند باز است",
  },
};

const experiences: Record<string, Omit<ExperienceText, "company">> = {
  "Webilia|Full Stack Developer": {
    role: "توسعه‌دهنده فول‌استک", period: "اوت ۲۰۲۴ تا اکنون", location: "ونکوور بزرگ، کانادا", employment_type: "تمام‌وقت", workplace_type: "دورکار",
    summary: "توسعه و نگهداری Listdom، پلتفرم تجاری دایرکتوری وردپرس، همراه با افزونه‌ها، قالب‌ها، یکپارچه‌سازی‌ها و ابزارهای توسعه آن.",
    highlights: [
      "به گفته صاحب رزومه، بیش از ۶۰۰ درخواست تغییر در این مجموعه؛ حدود ۴۰۰ مورد در هسته و بیش از ۲۰۰ مورد در بخش‌های مرتبط.",
      "طراحی و پیاده‌سازی بسته‌های Template Builder، Demo Importer و Settings Panel و قالب Placora.",
      "ساخت یکپارچه‌سازی Divi 5 و توسعه و نگهداری بیش از ۳۰ افزونه.",
      "بازبینی کد، رفع خطا در محیط عملیاتی، تصمیم‌های فنی و هماهنگی UI/UX. بخش پرداخت بر معماری اصلی مدیر محصول تکیه داشت.",
    ],
  },
  "RTL Theme|WordPress Developer · contract": {
    role: "توسعه‌دهنده وردپرس", period: "ژوئن ۲۰۲۴ تا اکنون", location: "شهرکرد، ایران", employment_type: "قراردادی", workplace_type: "دورکار",
    summary: "توسعه مستقل دو قالب تجاری: Blogina برای وب‌سایت‌های آموزشی و Serione برای وب‌سایت‌های شرکتی.",
    highlights: [
      "Blogina: تبدیل طرح فیگما به محصول وردپرسی، معماری قالب، تنظیمات و نماهای مرتبط با دوره‌ها.",
      "Serione: زیرساخت تنظیمات، امکانات المنتور و ووکامرس، محتوای پروژه، فیلتر AJAX و بخش‌های حساب کاربری.",
    ],
  },
  "Dalga|WordPress Developer · freelance": {
    role: "توسعه‌دهنده وردپرس", period: "اوت ۲۰۲۴ تا ژانویه ۲۰۲۵", location: "دبی، امارات", employment_type: "فریلنس", workplace_type: "دورکار",
    summary: "ساخت افزونه درگاه سفارشی PayPro Global برای فرایند فروش و اشتراک در وردپرس.",
    highlights: ["اتصال درگاه به WooCommerce Subscriptions و جریان پرداخت آن.", "مدیریت مرز میان وردپرس، ووکامرس، اشتراک‌ها و ارائه‌دهنده پرداخت."],
  },
  "iGame|Full Stack Developer": {
    role: "توسعه‌دهنده فول‌استک", period: "مارس ۲۰۲۴ تا ژانویه ۲۰۲۵", location: "شیراز، ایران", employment_type: "تمام‌وقت", workplace_type: "دورکار",
    summary: "کار روی وب‌سایت مشتریان و پنل کاربری و اتصال فرانت‌اند Next.js به وردپرس و API سرویس دیگر.",
    highlights: ["ساخت جریان‌های محصول، سفارش و حساب کاربری در Next.js.", "کار در کد موجود وردپرس و نگهداری قالب سفارشی؛ مخازن عمومی PWA بخش فرانت‌اند را نشان می‌دهند."],
  },
  "Panjere Studio|Technical Team Lead": {
    role: "سرپرست تیم فنی", period: "نوامبر ۲۰۲۳ تا ژوئن ۲۰۲۴", location: "ایران", employment_type: "تمام‌وقت", workplace_type: "دورکار",
    summary: "در کنار ادامه مشارکت در تحویل محصول، از توسعه مستقیم به رهبری فنی تیم رفتم.",
    highlights: ["هدایت بیش از ۵ توسعه‌دهنده در برنامه‌ریزی، بازبینی کد، تصمیم‌های معماری، منتورینگ و رفع خطا.", "هدایت ادامه توسعه ClickChin پس از مرحله اولیه و مشارکت در TechTeamBuilder.", "حضور در مصاحبه‌های فنی و منابع انسانی برای نقش‌های توسعه‌دهنده."],
  },
  "Panjere Studio|Full Stack Web Developer": {
    role: "توسعه‌دهنده فول‌استک وب", period: "اکتبر تا نوامبر ۲۰۲۳", location: "ایران", employment_type: "تمام‌وقت", workplace_type: "دورکار",
    summary: "توسعه محصولات پنجره در برنامه‌های Laravel و Next.js، سایت‌های وردپرسی، یکپارچه‌سازی فروشگاه و ابزارهای PHP.",
    highlights: ["ساخت جریان‌های اولیه کامپوننت و قالب ClickChin، از جمله تنظیمات JSON و مسیرهای خروجی تولیدشده.", "توسعه قالب استودیو، miniCli و یکپارچه‌سازی Anar360 با ووکامرس.", "کار روی Laboratory و فرایندهای استقرار؛ ادعا درباره کل پلتفرم به کد بررسی‌شده محدود است."],
  },
  "AKAF System|Full Stack Web Developer · contract": {
    role: "توسعه‌دهنده فول‌استک وب", period: "اکتبر ۲۰۲۲ تا ژانویه ۲۰۲۴", location: "گرگان، ایران", employment_type: "قراردادی", workplace_type: "دورکار",
    summary: "توسعه و نگهداری سایت‌های تجاری وردپرس برای مشتریان بین‌المللی، اغلب با سفارشی‌سازی قالب‌های تجاری.",
    highlights: ["به گفته صاحب رزومه، بیش از ۱۰ سایت؛ کار شامل فرانت‌اند، بک‌اند، پایگاه داده، یکپارچه‌سازی و استقرار بود.", "توسعه سایت‌های AKAF و AKAF Business؛ مخزن عمومی مشخصی به این نقش نسبت داده نشده است."],
  },
  "Radiscar|Full Stack Web Developer": {
    role: "توسعه‌دهنده فول‌استک وب", period: "فوریه ۲۰۲۲ تا سپتامبر ۲۰۲۳", location: "استان تهران، ایران", employment_type: "تمام‌وقت", workplace_type: "دورکار",
    summary: "سفارشی‌سازی فروشگاه خودرو مبتنی بر ووکامرس و سپس طراحی و کدنویسی بخش بزرگی از قالب جایگزین پیش از پایان همکاری.",
    highlights: ["ساخت جست‌وجو و فیلتر محصولات و بازطراحی بخش‌های فروشگاه.", "همکاری با تیم فروش و بازاریابی به‌عنوان توسعه‌دهنده اصلی؛ ادعای تأییدنشده درباره انتشار یا بهبود عملکرد مطرح نمی‌شود."],
  },
  "Independent work|Freelance Full Stack Web Developer": {
    role: "توسعه‌دهنده مستقل فول‌استک وب", period: "فوریه ۲۰۱۶ تا ژوئن ۲۰۲۱ · هم‌زمان با کارهای دیگر", location: "ایران", employment_type: "فریلنس", workplace_type: "ترکیبی",
    summary: "انجام پروژه‌های مستقل وب از نیازسنجی تا استقرار و نگهداری، در کنار دوره‌های دیگر فعالیت.",
    highlights: ["به گفته صاحب رزومه، بیش از ۲۰ پروژه در وردپرس و برنامه‌های سفارشی PHP و Laravel.", "مدیریت هاست، دامنه، راه‌اندازی سرور و نگهداری برای مشتریان."],
  },
};

export function projectText(project: Project, locale: Locale): ProjectText {
  return locale === "fa" ? projects[project.slug] ?? project : project;
}

export function experienceText(experience: Experience, locale: Locale): ExperienceText {
  if (locale === "en") return experience;
  const translated = experiences[`${experience.company}|${experience.role}`];
  return translated ? { company: companyName(experience.company, locale), ...translated } : experience;
}

export const translatedProjectSlugs = Object.keys(projects);
export const translatedExperienceKeys = Object.keys(experiences);
