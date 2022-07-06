using Wepsys.Core;

namespace RI.Novus.Core.Users;

///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Names</summary>
public sealed class Names : AbstractStringPrimitive
{
	/// Represents the Description minimum length restriction.
	public const int MinLength = 1;

	/// Represents the Description max length restriction.
	public const int MaxLength = 100;

	private static readonly Message ErrorMessage = new("Invalid value or format for Names");
	private static readonly StringLengthRange LengthRange = (MinLength, MaxLength).ToLengthRange();

	/// <summary>
	/// Shortcut for constructor <see cref="Names"/>.
	/// <param name="names">Represents a names.</param>
	/// <returns>An instance of <see cref="Names"/></returns>
	/// </summary>
	public static Names From(string names) => new(names);
	private Names(string rawNames) : base(rawNames, LengthRange, ErrorMessage)
	{
	}
}
