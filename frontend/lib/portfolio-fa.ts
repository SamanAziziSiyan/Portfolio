import type { Experience, Project } from "@/lib/data";
import type { Locale } from "@/lib/locale";
import { companyName } from "@/lib/translations";

type ProjectText = Pick<Project, "name" | "kind" | "summary" | "contribution" | "visibility">;
type ExperienceText = Pick<Experience, "company" | "role" | "period" | "location" | "employment_type" | "workplace_type" | "summary" | "highlights">;

const projects: Record<string, ProjectText> = {
  blogina: {
    name: "Blogina", kind: "قالب آموزشی وردپرس", summary: "قالبی برای سایت‌های آموزش آنلاین و معرفی دوره‌ها.",
    contribution: "از تبدیل طرح فیگما به قالب وردپرس تا معماری، امکانات و تنظیمات آن را به‌صورت مستقل انجام دادم.",
    visibility: "قالب تجاری؛ کد منبع اختصاصی",
  },
  serione: {
    name: "Serione", kind: "قالب شرکتی وردپرس", summary: "قالبی برای معرفی شرکت و پروژه‌ها، فروش محصولات و مدیریت حساب کاربران.",
    contribution: "معماری و ظاهر قالب، تنظیمات، بخش‌های المنتور و ووکامرس و جریان‌های حساب کاربری را به‌صورت مستقل ساختم.",
    visibility: "قالب تجاری؛ کد منبع اختصاصی",
  },
  "clickchin-builder": {
    name: "ClickChin / صفحه‌ساز", kind: "ابزار ساخت صفحه فرود", summary: "ویرایشگری برای ساخت و پیش‌نمایش صفحه‌های فرود، با Next.js و API لاراول.",
    contribution: "API ذخیره صفحه‌ها و اجزای آن‌ها را در لاراول ساختم و در ویرایشگر و ابزارهای توسعه مشارکت داشتم. سامانه کامل انتشار در این مخزن نیست.",
    visibility: "زیرسیستم عمومی پاک‌سازی‌شده",
  },
  "amiramir-jewelry": {
    name: "AMIRAMIR Jewelry", kind: "قالب اختصاصی وردپرس", summary: "فروشگاه جواهرات با کاتالوگ، حساب کاربری، علاقه‌مندی‌ها و رزرو وقت مراجعه.",
    contribution: "معماری قالب و بخش بزرگی از کاتالوگ، تنظیمات، حساب کاربری، علاقه‌مندی‌ها و رابط کاربری را با همکاری سلیمان نادری ساختم.",
    visibility: "قالب عمومی پاک‌سازی‌شده",
  },
  "anar360-integration": {
    name: "اتصال Anar360 به ووکامرس", kind: "یکپارچه‌سازی فروشگاه", summary: "انتقال داده‌های کاتالوگ Anar360 به محصولات و دسته‌بندی‌های ووکامرس.",
    contribution: "دریافت داده از API، تطبیق دسته‌ها و ویژگی‌ها و به‌روزرسانی محصولات را با همکاری تیم پیاده‌سازی کردم.",
    visibility: "افزونه عمومی پاک‌سازی‌شده",
  },
  "panjere-studio-theme": {
    name: "استودیو پنجره", kind: "قالب وردپرس", summary: "قالبی برای نمایش پروژه‌ها، انتشار مطالب و دریافت پیام از بازدیدکنندگان.",
    contribution: "بیشتر کد این قالب، از جمله صفحه‌های PHP، ساختار پروژه‌ها و بخش تماس را نوشتم. طراحی و بخش‌های مشترک با نام همکارانشان مشخص شده‌اند.",
    visibility: "قالب عمومی پاک‌سازی‌شده",
  },
  "tebseo-theme": {
    name: "TEBSEO", kind: "قالب بازاریابی وردپرس", summary: "سایت معرفی خدمات با صفحه‌های واکنش‌گرا و فرم درخواست تماس.",
    contribution: "بخش اصلی توسعه ثبت‌شده در مخزن را انجام دادم و قالب و ابزارهای محلی آن را با همکاران ساختم.",
    visibility: "قالب عمومی پاک‌سازی‌شده",
  },
  "panjere-mini-cli": {
    name: "Panjere miniCli", kind: "ابزار خط فرمان", summary: "ابزار PHP برای شروع سریع‌تر پروژه‌های وردپرسی و تولید کدهای تکراری.",
    contribution: "فرمان‌های کار با پوشه‌ها و Git، راه‌اندازی وردپرس و تولید نوع نوشته و دسته‌بندی سفارشی را در این ابزار تیمی ساختم.",
    visibility: "ابزار عمومی پاک‌سازی‌شده",
  },
  "igame-pwa": {
    name: "iGame PWA", kind: "برنامه کاربران", summary: "رابط Next.js برای حساب کاربری، محصولات، سفارش‌ها و کیف پول، متصل به دو API.",
    contribution: "در توسعه بخش مهمی از رابط Next.js و TypeScript مشارکت داشتم. سرویس‌های بک‌اند جدا از این مخزن هستند.",
    visibility: "مخزن تاریخی عمومی؛ بررسی حقوق انتشار باز است",
  },
  "amlak-arad-panel": {
    name: "پنل املاک آراد", kind: "پنل مدیریت", summary: "رابط React برای مدیریت املاک که به API وردپرس متصل می‌شود.",
    contribution: "در ساخت رابط React مشارکت داشتم. کد موجود، جزئیات قرارداد یا دامنه کار در سایر بخش‌های محصول را روشن نمی‌کند.",
    visibility: "مخزن تاریخی عمومی؛ بررسی امنیت بک‌اند باز است",
  },
};

const experiences: Record<string, Omit<ExperienceText, "company">> = {
  "Webilia|Full Stack Developer": {
    role: "توسعه‌دهنده فول‌استک", period: "اوت ۲۰۲۴ تا اکنون", location: "ونکوور بزرگ، کانادا", employment_type: "تمام‌وقت", workplace_type: "دورکار",
    summary: "در وبیلیا روی توسعه و نگهداری Listdom کار می‌کنم؛ از هسته محصول تا افزونه‌ها، قالب‌ها، یکپارچه‌سازی‌ها و ابزارهای توسعه.",
    highlights: [
      "بیش از ۶۰۰ درخواست تغییر برای Listdom ثبت کردم؛ حدود ۴۰۰ مورد در هسته و بیش از ۲۰۰ مورد در محصولات مرتبط.",
      "Template Builder، Demo Importer، Settings Panel و قالب Placora را طراحی و پیاده‌سازی کردم.",
      "اتصال Divi 5 را ساختم و در توسعه و نگهداری بیش از ۳۰ افزونه، بازبینی کد و رفع خطاهای محیط عملیاتی نقش داشتم.",
    ],
  },
  "RTL Theme|WordPress Developer · contract": {
    role: "توسعه‌دهنده وردپرس", period: "ژوئن ۲۰۲۴ تا اکنون", location: "شهرکرد، ایران", employment_type: "قراردادی", workplace_type: "دورکار",
    summary: "دو قالب تجاری Blogina برای سایت‌های آموزشی و Serione برای سایت‌های شرکتی را به‌صورت مستقل ساخته‌ام.",
    highlights: [
      "Blogina: طرح فیگما را به قالب آموزشی وردپرس تبدیل کردم و معماری، تنظیمات و صفحه‌های دوره را ساختم.",
      "Serione: ساختار پروژه‌ها، ابزارک‌های المنتور، امکانات ووکامرس، فیلتر AJAX و بخش حساب کاربری را توسعه دادم.",
    ],
  },
  "Dalga|WordPress Developer · freelance": {
    role: "توسعه‌دهنده وردپرس", period: "اوت ۲۰۲۴ تا ژانویه ۲۰۲۵", location: "دبی، امارات", employment_type: "فریلنس", workplace_type: "دورکار",
    summary: "افزونه درگاه PayPro Global را برای پرداخت‌های فروشگاه و اشتراک در ووکامرس ساختم.",
    highlights: ["اتصال درگاه به WooCommerce Subscriptions و جریان پرداخت آن.", "مدیریت مرز میان وردپرس، ووکامرس، اشتراک‌ها و ارائه‌دهنده پرداخت."],
  },
  "iGame|Full Stack Developer": {
    role: "توسعه‌دهنده فول‌استک", period: "مارس ۲۰۲۴ تا ژانویه ۲۰۲۵", location: "شیراز، ایران", employment_type: "تمام‌وقت", workplace_type: "دورکار",
    summary: "در توسعه سایت و پنل کاربران آی‌گیم مشارکت داشتم و رابط Next.js را به وردپرس و سرویس مبتنی بر .NET متصل کردم.",
    highlights: ["تجربه محصول، سفارش و حساب کاربری را در Next.js و با اتصال به APIهای وردپرس و .NET توسعه دادم.", "قالب اختصاصی وردپرس را نگهداری کردم و بیش از ۵۰ مشکل را در پروژه‌ها برطرف کردم."],
  },
  "Panjere Studio|Technical Team Lead": {
    role: "سرپرست تیم فنی", period: "نوامبر ۲۰۲۳ تا ژوئن ۲۰۲۴", location: "ایران", employment_type: "تمام‌وقت", workplace_type: "دورکار",
    summary: "سرپرستی فنی تیم را بر عهده گرفتم و هم‌زمان در توسعه و تحویل محصول فعال ماندم.",
    highlights: ["تیم بیش از ۵ نفره را در برنامه‌ریزی، بازبینی کد، معماری، راهنمایی و رفع خطا هدایت کردم.", "در کنار کدنویسی، تحویل ClickChin را هماهنگ کردم و در TechTeamBuilder مشارکت داشتم.", "در مصاحبه‌های فنی و منابع انسانی برای جذب توسعه‌دهندگان شرکت کردم."],
  },
  "Panjere Studio|Full Stack Web Developer": {
    role: "توسعه‌دهنده فول‌استک وب", period: "اکتبر تا نوامبر ۲۰۲۳", location: "ایران", employment_type: "تمام‌وقت", workplace_type: "دورکار",
    summary: "روی محصولات پنجره با Laravel و Next.js، سایت‌های وردپرسی، اتصال فروشگاه‌ها و ابزارهای PHP کار کردم.",
    highlights: ["در ساخت نسخه اولیه صفحه‌ساز ClickChin با Laravel و Next.js نقش داشتم.", "قالب استودیو، miniCli و اتصال Anar360 به ووکامرس را توسعه دادم.", "در کارهای مربوط به Laboratory و فرایندهای استقرار مشارکت کردم."],
  },
  "AKAF System|Full Stack Web Developer · contract": {
    role: "توسعه‌دهنده فول‌استک وب", period: "اکتبر ۲۰۲۲ تا ژانویه ۲۰۲۴", location: "گرگان، ایران", employment_type: "قراردادی", workplace_type: "دورکار",
    summary: "سایت‌های وردپرسی مشتریان بین‌المللی را ساختم و نگهداری کردم؛ بسیاری از آن‌ها بر پایه قالب‌های تجاری سفارشی‌شده بودند.",
    highlights: ["بیش از ۱۰ سایت مشتری را در بخش‌های رابط کاربری، بک‌اند، داده، یکپارچه‌سازی و استقرار توسعه دادم.", "روی سایت‌های AKAF و AKAF Business نیز کار کردم."],
  },
  "Radiscar|Full Stack Web Developer": {
    role: "توسعه‌دهنده فول‌استک وب", period: "فوریه ۲۰۲۲ تا سپتامبر ۲۰۲۳", location: "استان تهران، ایران", employment_type: "تمام‌وقت", workplace_type: "دورکار",
    summary: "ابتدا فروشگاه خودرو را در ووکامرس توسعه دادم و بعد بخش بزرگی از قالب جایگزین آن را طراحی و پیاده‌سازی کردم.",
    highlights: ["جست‌وجو و فیلتر محصولات را بهتر کردم و بخش‌هایی از فروشگاه را بازطراحی کردم.", "با تیم فروش و بازاریابی همکاری داشتم و بخش بزرگی از قالب جایگزین فروشگاه را ساختم."],
  },
  "Independent work|Freelance Full Stack Web Developer": {
    role: "توسعه‌دهنده مستقل فول‌استک وب", period: "فوریه ۲۰۱۶ تا ژوئن ۲۰۲۱ · هم‌زمان با کارهای دیگر", location: "ایران", employment_type: "فریلنس", workplace_type: "ترکیبی",
    summary: "پروژه‌های مستقل وب را از شناخت نیاز مشتری تا ساخت، استقرار و نگهداری پیش بردم؛ بخشی از این دوره با نقش‌های دیگر هم‌زمان بود.",
    highlights: ["بیش از ۲۰ پروژه وردپرسی و سفارشی با PHP و Laravel تحویل دادم.", "از جمع‌آوری نیازها تا مدیریت هاست، دامنه، استقرار و نگهداری کنار مشتری بودم."],
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
