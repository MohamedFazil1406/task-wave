type ContentType = React.ReactNode | number | string;

interface CardProps {
  className?: string;
  title: string;
  content: ContentType;
  titleClassName?: string;
  contentClassName?: string;
}

export default function Card({
  className = "",
  title,
  content,
  titleClassName = "",
  contentClassName = "",
  ...rest
}: CardProps) {
  return (
    <div className="ml-10 mt-6  w-80">
      <div className={`${className} h-44 p-4 rounded-lg shadow-2xl`} {...rest}>
        <h2 className={`${titleClassName} text-2xl font-bold mb-2`} {...rest}>
          {title}
        </h2>
        <p className={`${contentClassName} font-bold pt-4 text-7xl `} {...rest}>
          {content}
        </p>
      </div>
    </div>
  );
}
