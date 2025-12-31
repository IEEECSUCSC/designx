import { Input as BaseInput } from "@base-ui/react/input";

type InputProps = React.ComponentPropsWithoutRef<typeof BaseInput>;

export default function Input(props: InputProps) {
  return <BaseInput {...props} className={" border-b "} />;
}
