import { Theme } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Placeholders } from "../../constants";
import { createTheme } from "@/app/lib/actions/theme.actions";
import { BORDER_RADIUS, COLORS, FONT, FONT_SIZE } from "./constants";

export interface CreateThemeFormProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  /**
   * Optional form object, if provided then form will act as edit.
   */
  theme?: Theme;
}
export function CreateThemeForm({
  onCancel,
  onSubmit,
  theme,
}: CreateThemeFormProps) {
  const session = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedHFontColor, setSelectedHFontColor] = useState("#000000");
  const [selectedHFont, setSelectedHFont] = useState("Roboto");
  const [selectedHFontSize, setSelectedHFontSize] = useState("20px");
  const [selectedPFontColor, setSelectedPFontColor] = useState("#000000");
  const [selectedPFont, setSelectedPFont] = useState("Roboto");
  const [selectedPFontSize, setSelectedPFontSize] = useState("16px");
  const [selectedBorderRadius, setSelectedBorderRadius] = useState("0px");
  const [selectedBGColor, setSelectedBGColor] = useState("#808080");
  const [selectedSecondaryColor, setSelectedSecondaryColor] =
    useState("#FF7E6B");
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState("#A9F0D1");

  const handleSubmit = async (formData: FormData) => {
    if (!session.data?.user?.id) throw new Error("User not found");
    const theme: Theme = {
      name: formData.get("name") as string,
      headingFont: formData.get("h-font") as string,
      headingFontSize: formData.get("h-font-size") as string,
      headingFontColor: formData.get("h-font-color") as string,
      contentFont: formData.get("p-font") as string,
      contentFontSize: formData.get("p-font-size") as string,
      contentFontColor: formData.get("p-font-color") as string,
      borderRadius: formData.get("border-radius") as string,
      borderColor: (formData.get("border-color") as string) ?? "",
      basePrimaryColor: formData.get("base-primary-color") as string,
      baseSecondaryColor:
        (formData.get("base-secondary-color") as string) ?? "",
      secondaryColor: formData.get("secondary-color") as string,
      primaryColor: formData.get("primary-color") as string,
    } as Theme;

    await createTheme(theme);

    clearForm();
    onSubmit && onSubmit();
  };
  const handleCancel = () => {
    clearForm();
    onCancel && onCancel();
  };
  const clearForm = async () => {
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-2 justify-center w-full"
      onAbort={() => clearForm()}
      action={handleSubmit}
    >
      <input
        required
        type="text"
        name="name"
        className="input input-bordered input-sm w-full max-w-xs"
        placeholder={Placeholders.ENTER_NAME}
        defaultValue={theme?.name}
      />

      <div className="flex gap-3 items-end">
        {/* Heading Font */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{Placeholders.PICK_H_FONT}</span>
          </div>
          <select
            required
            name="h-font"
            className="select select-bordered select-sm"
            onChange={(e) => setSelectedHFont(e.currentTarget.value)}
            value={theme?.headingFont ?? selectedHFont}
          >
            {FONT.map((font) => (
              <option key={font.name} value={font.value} label={font.name} />
            ))}
          </select>
        </label>
        {/* Heading Font Size */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{Placeholders.PICK_H_FONT_SIZE}</span>
          </div>
          <select
            required
            name="h-font-size"
            className="select select-bordered select-sm"
            onChange={(e) => setSelectedHFontSize(e.currentTarget.value)}
            value={theme?.headingFontSize ?? selectedHFontSize}
          >
            {FONT_SIZE.map((size) => (
              <option key={size.name} value={size.value} label={size.name} />
            ))}
          </select>
        </label>
        {/* Heading Font Color */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{Placeholders.PICK_A_COLOR}</span>
          </div>
          <select
            required
            name="h-font-color"
            className="select select-bordered select-sm"
            onChange={(e) => setSelectedHFontColor(e.currentTarget.value)}
            value={theme?.headingFontColor ?? selectedHFontColor}
          >
            {COLORS.map((color) => (
              <option key={color.name} value={color.value} label={color.name} />
            ))}
          </select>
        </label>
      </div>
      <div className="flex gap-3 items-end">
        {/* Content Font */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{Placeholders.PICK_P_FONT}</span>
          </div>
          <select
            required
            name="p-font"
            className="select select-bordered select-sm"
            onChange={(e) => setSelectedPFont(e.currentTarget.value)}
            value={theme?.contentFont ?? selectedPFont}
          >
            {FONT.map((font) => (
              <option key={font.name} value={font.value} label={font.name} />
            ))}
          </select>
        </label>
        {/* Contetn Font Size */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{Placeholders.PICK_P_FONT_SIZE}</span>
          </div>
          <select
            required
            name="p-font-size"
            className="select select-bordered select-sm"
            onChange={(e) => setSelectedPFontSize(e.currentTarget.value)}
            value={theme?.contentFontSize ?? selectedPFontSize}
          >
            {FONT_SIZE.map((size) => (
              <option key={size.name} value={size.value} label={size.name} />
            ))}
          </select>
        </label>
        {/* Heading Font Color */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{Placeholders.PICK_A_COLOR}</span>
          </div>
          <select
            required
            name="p-font-color"
            className="select select-bordered select-sm"
            onChange={(e) => setSelectedPFontColor(e.currentTarget.value)}
            value={theme?.contentFontColor ?? selectedPFontColor}
          >
            {COLORS.map((color) => (
              <option key={color.name} value={color.value} label={color.name} />
            ))}
          </select>
        </label>
      </div>

      {/* Border Radius */}
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{Placeholders.BORDER_RADIUS}</span>
        </div>
        <select
          required
          name="border-radius"
          className="select select-bordered select-sm"
          onChange={(e) => setSelectedBorderRadius(e.currentTarget.value)}
          value={theme?.borderRadius ?? selectedBorderRadius}
        >
          {BORDER_RADIUS.map((radius) => (
            <option
              key={radius.name}
              value={radius.value}
              label={radius.name}
            />
          ))}
        </select>
      </label>

      {/* Background Color */}
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{Placeholders.BG_COLOR}</span>
        </div>
        <select
          required
          name="base-primary-color"
          className="select select-bordered select-sm"
          onChange={(e) => setSelectedBGColor(e.currentTarget.value)}
          value={theme?.basePrimaryColor ?? selectedBGColor}
        >
          {COLORS.map((color) => (
            <option key={color.name} value={color.value} label={color.name} />
          ))}
        </select>
      </label>

      {/* Primary Color */}
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{"Select primary color"}</span>
        </div>
        <select
          required
          name="primary-color"
          className="select select-bordered select-sm"
          onChange={(e) => setSelectedPrimaryColor(e.currentTarget.value)}
          value={theme?.primaryColor ?? selectedPrimaryColor}
        >
          {COLORS.map((color) => (
            <option key={color.name} value={color.value} label={color.name} />
          ))}
        </select>
      </label>
      {/* Secondary Color */}
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{"Select secondary color"}</span>
        </div>
        <select
          required
          name="secondary-color"
          className="select select-bordered select-sm"
          onChange={(e) => setSelectedSecondaryColor(e.currentTarget.value)}
          value={theme?.secondaryColor ?? selectedSecondaryColor}
        >
          {COLORS.map((color) => (
            <option key={color.name} value={color.value} label={color.name} />
          ))}
        </select>
      </label>

      {/* Testimonial Sample */}
      <div
        className="w-1/3 h-60 p-3 bg-base-200 relative"
        style={{
          borderRadius: selectedBorderRadius,
          background: selectedBGColor,
        }}
      >
        <div
          style={{
            marginBottom: "4px",
            color: selectedHFontColor,
            font: selectedHFont,
            fontSize: selectedHFontSize,
          }}
        >
          Heading Sample
        </div>
        <div
          style={{
            color: selectedPFontColor,
            font: selectedPFont,
            fontSize: selectedPFontSize,
          }}
        >
          This is the content sample text for your reference.
        </div>
        <div className="flex gap-3 absolute bottom-2">
          <div
            className="btn btn-xs"
            style={{ background: theme?.primaryColor ?? selectedPrimaryColor }}
          >
            Submit
          </div>
          <div
            className="btn btn-xs"
            style={{
              background: theme?.secondaryColor ?? selectedSecondaryColor,
            }}
          >
            Cancel
          </div>
        </div>
      </div>

      {/* form controls  */}
      <div className="form-control flex flex-row gap-2 justify-end mt-4">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-accent">
          Save
        </button>
      </div>
    </form>
  );
}
