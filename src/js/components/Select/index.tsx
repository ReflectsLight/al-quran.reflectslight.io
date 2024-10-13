import { Option } from "./Option";
import { ThemeSelect } from "./ThemeSelect";
import { LanguageSelect } from "./LanguageSelect";

type Props = {
  value: string;
  children: JSX.Element[];
  className?: string;
};

function Select({ value, children: options, className }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [option, setOption] = useState<JSX.Element | null>(null);
  const sortedOptions = options.sort((n) => (value === n.props.value ? -1 : 1));
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.addEventListener("click", close);
    return () => document.body.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    setOption(options.find((n) => value === n.props.value) || null);
  }, [value]);

  return (
    <div
      className={classNames(
        "react-select flex flex-col h-full relative z-10",
        className,
      )}
    >
      <ul className="m-0 p-0 list-none text-base h-full mb-5">
        {sortedOptions.map((n: JSX.Element, key: number) => {
          const isHidden = !isOpen && option?.props.value !== n.props.value;
          return (
            <li
              key={key}
              className={classNames({ hidden: isHidden })}
              onClick={(e) => {
                e.stopPropagation();
                const { ref } = n.props;
                setOpen(!isOpen);
                ref?.current?.click();
              }}
            >
              {n}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Select.Option = Option;

export { Select, LanguageSelect, ThemeSelect };
