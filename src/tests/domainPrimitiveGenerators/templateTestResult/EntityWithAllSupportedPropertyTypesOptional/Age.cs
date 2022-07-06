using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents EntityWithAllSupportedPropertyTypesOptional's Age
/// </summary>
public sealed class Age : AbstractPositiveIntegerPrimitive
{
	private static readonly PositiveInteger MinValue = new(1);
	private static readonly PositiveInteger MinValue = new(100);

	/// <summary>
	/// Creates an instance of <see cref="Age"/>.
	/// <param name="rawValue"></param>
	/// </summary>
	public Age(PositiveInteger rawValue) : base(rawValue, MinValue, MaxValue)
	{
	}

	/// <summary>
	/// Shortcut for constructor <see cref="Age"/>.
	/// <param name="rawAge">Represents a age.</param>
	/// <returns>An instance of <see cref="Age"/></returns>
	/// </summary>
	public static Age From(int rawAge) => new(new PositiveInteger(rawAge));

}
